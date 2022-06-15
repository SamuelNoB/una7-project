
import { PrismaClient } from "@prisma/client";

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;