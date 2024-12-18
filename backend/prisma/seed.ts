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

  for (let query of data) {
    query = query.trim();
    try {
      if (query != "") await db.$executeRawUnsafe(query);
    } catch (error) {console.log("Error executing:\n" + query);}
  };
}

main().catch(e => console.error(e));
