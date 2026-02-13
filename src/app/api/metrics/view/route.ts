import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

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
    const key = body.urlMaterial || body.materialId;
    if (!key) {
      return NextResponse.json({ error: "Falta materialId o urlMaterial" }, { status: 400 });
    }

    // Consolidación si vienen ambas claves distintas
    if (body.urlMaterial && body.materialId && body.urlMaterial !== body.materialId) {
      try {
        const { rows: [docId] } = await pool.query("SELECT count FROM material_views WHERE key = $1", [body.materialId]);
        const { rows: [docUrl] } = await pool.query("SELECT count FROM material_views WHERE key = $1", [body.urlMaterial]);

        if (docId && !docUrl) {
          await pool.query(
            "UPDATE material_views SET key = $1, url_material = $1, material_id = $2 WHERE key = $2",
            [body.urlMaterial, body.materialId]
          );
        } else if (docId && docUrl) {
          const total = Number(docUrl.count ?? 0) + Number(docId.count ?? 0);
          await pool.query("UPDATE material_views SET count = $2 WHERE key = $1", [body.urlMaterial, total]);
          await pool.query("DELETE FROM material_views WHERE key = $1", [body.materialId]);
        }
      } catch { /* ignore */ }
    }

    // Upsert + incremento
    await pool.query(
      `INSERT INTO material_views (key, material_id, title, url_material, ubication, type, count, created_at, last_viewed_at)
       VALUES ($1, $2, $3, $4, $5, $6, 1, NOW(), NOW())
       ON CONFLICT (key) DO UPDATE SET
         count = material_views.count + 1,
         last_viewed_at = NOW(),
         material_id = COALESCE(EXCLUDED.material_id, material_views.material_id),
         title = COALESCE(EXCLUDED.title, material_views.title),
         url_material = COALESCE(EXCLUDED.url_material, material_views.url_material),
         ubication = COALESCE(EXCLUDED.ubication, material_views.ubication),
         type = COALESCE(EXCLUDED.type, material_views.type)
      `,
      [key, body.materialId, body.title, body.urlMaterial, body.ubication, body.type]
    );

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

    const { rows } = await pool.query(
      `SELECT key, title, url_material AS "urlMaterial", count, type, ubication
       FROM material_views
       ORDER BY count DESC
       LIMIT $1`,
      [top]
    );

    const items = rows.map((d: any) => ({
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
    return NextResponse.json({ error: "Error leyendo métricas" }, { status: 500 });
  }
}
