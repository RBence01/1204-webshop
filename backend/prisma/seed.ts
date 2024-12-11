import { PrismaService } from './../src/prisma.service';
//@ts-ignore
import { readFileSync } from 'fs';

const db = new PrismaService();

async function main() {
  const data = readFileSync("prisma/data.sql", "utf8")
    .toString()
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s+/g, ' ')
    .split(";");

  data.forEach(async e => {
    try {
      if (e != " " && e != "") await db.$executeRawUnsafe(e.trim());
    } catch {console.log("Error executing:\n" + e);}
  });
}

main().catch(e => console.error(e));
