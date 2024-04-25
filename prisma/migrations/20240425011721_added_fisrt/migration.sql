-- CreateTable
CREATE TABLE "Saldo" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "filial" TEXT NOT NULL,
    "forecast" DECIMAL(65,30) NOT NULL,
    "estoque_in_house" INTEGER NOT NULL,
    "estoque_livre" INTEGER NOT NULL,
    "compras" INTEGER NOT NULL,
    "transferencias" INTEGER NOT NULL,
    "politica" INTEGER NOT NULL,
    "base_NS" TEXT NOT NULL,
    "ns" DECIMAL(65,30) NOT NULL,
    "ns_ex_bo_total" DECIMAL(65,30) NOT NULL,
    "ns_ex_bo_ttl_parc" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Saldo_pkey" PRIMARY KEY ("id")
);
