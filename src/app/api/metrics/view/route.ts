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
