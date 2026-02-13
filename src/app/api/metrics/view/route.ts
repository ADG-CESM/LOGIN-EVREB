import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongo";

interface ViewPayload {
  materialId?: string;
  title?: string;
  urlMaterial?: string;
  ubication?: string;
  type?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ViewPayload;
    // Usa siempre urlMaterial como clave cuando esté disponible para evitar duplicados
    const key = body.urlMaterial || body.materialId;
    if (!key) {
      return NextResponse.json({ error: "Falta materialId o urlMaterial" }, { status: 400 });
    }

    const db = await getMongoDb();
    if (!db) {
      return NextResponse.json({ error: "MongoDB no configurado" }, { status: 500 });
    }

    const col = db.collection("materialViews");
    // Asegura índice único por clave; si ya existe no hace nada
    try {
      await col.createIndex({ key: 1 }, { unique: true });
    } catch {}

    // Si vienen ambas claves y son distintas, intenta consolidar registros previos
    // Escenario: antes se guardó con materialId y ahora llega urlMaterial
    if (body.urlMaterial && body.materialId && body.urlMaterial !== body.materialId) {
      try {
        const [docUrl, docId] = await Promise.all([
          col.findOne<{ count?: number }>({ key: body.urlMaterial }),
          col.findOne<{ count?: number }>({ key: body.materialId }),
        ]);

        if (docId && !docUrl) {
          // Renombra la clave del doc antiguo (materialId) a la nueva (urlMaterial)
          await col.updateOne(
            { key: body.materialId },
            {
              $set: {
                key: body.urlMaterial,
                urlMaterial: body.urlMaterial,
                materialId: body.materialId,
              },
            }
          );
        } else if (docId && docUrl) {
          // Fusiona contadores y elimina el duplicado por materialId
          const total = Number(docUrl.count ?? 0) + Number(docId.count ?? 0);
          await col.updateOne(
            { key: body.urlMaterial },
            {
              $set: {
                urlMaterial: body.urlMaterial,
                materialId: body.materialId,
                lastViewedAt: new Date(),
              },
              $setOnInsert: { createdAt: new Date() },
              $inc: { count: 0 },
            },
            { upsert: true }
          );
          await col.updateOne({ key: body.urlMaterial }, { $set: { count: total } });
          await col.deleteOne({ key: body.materialId });
        }
      } catch {
        // Ignora fallos de consolidación para no bloquear el tracking
      }
    }

    // Normaliza 'count' si quedó como string en documentos anteriores
    try {
      await col.updateOne(
        { key, count: { $type: "string" } },
        [
          { $set: { count: { $toInt: "$count" } } }
        ]
      );
    } catch {}

    // Incrementa la vista de forma segura
    try {
      await col.updateOne(
        { key },
        {
          $setOnInsert: {
            key,
            materialId: body.materialId,
            title: body.title,
            urlMaterial: body.urlMaterial,
            ubication: body.ubication,
            type: body.type,
            createdAt: new Date(),
          },
          $set: { lastViewedAt: new Date() },
          $inc: { count: 1 },
        },
        { upsert: true }
      );
    } catch (e) {
      // Si falla por tipo no numérico, fuerza a 0 y reintenta
      try {
        await col.updateOne({ key }, { $set: { count: 0 } });
        await col.updateOne({ key }, { $inc: { count: 1 }, $set: { lastViewedAt: new Date() } });
      } catch {}
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error registrando vista" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const top = Math.max(1, Math.min(100, Number(searchParams.get("top") || 20)));
    const db = await getMongoDb();
    if (!db) {
      return NextResponse.json({ error: "MongoDB no configurado" }, { status: 500 });
    }

    const col = db.collection("materialViews");
    const cursor = col
      .find({}, { projection: { _id: 0, key: 1, title: 1, urlMaterial: 1, count: 1, type: 1, ubication: 1 } })
      .sort({ count: -1 })
      .limit(top);
    const raw = await cursor.toArray();
    const items = raw.map((d: any) => ({
      key: d.key,
      title: d.title,
      urlMaterial: d.urlMaterial,
      count: Number(d.count ?? 0),
      type: d.type,
      ubication: d.ubication,
    }));
    return NextResponse.json({ items });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error obteniendo métricas" }, { status: 500 });
  }
}
