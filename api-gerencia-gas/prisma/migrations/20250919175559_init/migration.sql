-- CreateEnum
CREATE TYPE "public"."PessoaTipo" AS ENUM ('DONO', 'INQUILINO', 'MORADOR');

-- CreateEnum
CREATE TYPE "public"."Periodicidade" AS ENUM ('SEMANAL', 'MENSAL', 'BIMESTRAL', 'SEMESTRAL', 'ANUAL');

-- CreateTable
CREATE TABLE "public"."Condominio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cep" TEXT,
    "logradouro" TEXT,
    "numero" TEXT,
    "bairro" TEXT,
    "estado" TEXT,
    "uf" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Condominio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Torre" (
    "id" SERIAL NOT NULL,
    "identificacao" TEXT NOT NULL,
    "condominioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Torre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Apartamento" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "torreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apartamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "tipo" "public"."PessoaTipo" NOT NULL,
    "apartamentoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hidrometro" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "apartamentoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hidrometro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Leitura" (
    "id" SERIAL NOT NULL,
    "hidrometroId" INTEGER NOT NULL,
    "dataLeitura" TIMESTAMP(3) NOT NULL,
    "valorM3" DECIMAL(18,6) NOT NULL,
    "periodicidade" "public"."Periodicidade" NOT NULL,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leitura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Torre_condominioId_idx" ON "public"."Torre"("condominioId");

-- CreateIndex
CREATE INDEX "Apartamento_torreId_idx" ON "public"."Apartamento"("torreId");

-- CreateIndex
CREATE UNIQUE INDEX "Apartamento_numero_torreId_key" ON "public"."Apartamento"("numero", "torreId");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_email_key" ON "public"."Pessoa"("email");

-- CreateIndex
CREATE INDEX "Pessoa_apartamentoId_idx" ON "public"."Pessoa"("apartamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "Hidrometro_codigo_key" ON "public"."Hidrometro"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Hidrometro_apartamentoId_key" ON "public"."Hidrometro"("apartamentoId");

-- CreateIndex
CREATE INDEX "Leitura_hidrometroId_dataLeitura_idx" ON "public"."Leitura"("hidrometroId", "dataLeitura");

-- AddForeignKey
ALTER TABLE "public"."Torre" ADD CONSTRAINT "Torre_condominioId_fkey" FOREIGN KEY ("condominioId") REFERENCES "public"."Condominio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Apartamento" ADD CONSTRAINT "Apartamento_torreId_fkey" FOREIGN KEY ("torreId") REFERENCES "public"."Torre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pessoa" ADD CONSTRAINT "Pessoa_apartamentoId_fkey" FOREIGN KEY ("apartamentoId") REFERENCES "public"."Apartamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hidrometro" ADD CONSTRAINT "Hidrometro_apartamentoId_fkey" FOREIGN KEY ("apartamentoId") REFERENCES "public"."Apartamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Leitura" ADD CONSTRAINT "Leitura_hidrometroId_fkey" FOREIGN KEY ("hidrometroId") REFERENCES "public"."Hidrometro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
