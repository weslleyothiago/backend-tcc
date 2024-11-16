import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = [
    { id: 1, generoMusical: 'K-pop', slug: 'k-pop' },
    { id: 2, generoMusical: 'Pop', slug: 'pop' },
    { id: 3, generoMusical: 'Rock', slug: 'rock' },
    { id: 4, generoMusical: 'Sertanejo', slug: 'sertanejo' },
    { id: 5, generoMusical: 'Funk', slug: 'funk' },
    { id: 6, generoMusical: 'Eletrônica', slug: 'eletronica' },
    { id: 7, generoMusical: 'Samba', slug: 'samba' },
    { id: 8, generoMusical: 'Forró', slug: 'forro' },
    { id: 9, generoMusical: 'Gospel', slug: 'gospel' },
    { id: 10, generoMusical: 'Rap', slug: 'rap' },
    { id: 11, generoMusical: 'Reggae', slug: 'reggae' },
    { id: 12, generoMusical: 'MPB', slug: 'mpb' },
    { id: 13, generoMusical: 'Metal', slug: 'metal' },
    { id: 14, generoMusical: 'Indie', slug: 'indie' },
    { id: 15, generoMusical: 'Alternativo', slug: 'alternativo' },
  ];

  for (const genre of genres) {
    // Verificar se o gênero já existe
    const existingGenre = await prisma.genero.findUnique({
      where: { slug: genre.slug },
    });

    // Se o gênero não existir, criá-lo
    if (!existingGenre) {
      await prisma.genero.create({
        data: {
          id: genre.id,
          generoMusical: genre.generoMusical,
          slug: genre.slug,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }

  const defaultUsers = [
    {
      id: 1,
      tipo: 'Administrador',
      email: 'admin@admin.com',
      senha: '',
    },
    {
      id: 2,
      tipo: 'Cliente',
      email: 'test@test.com',
      senha: '$2b$10$oGPMXSLcR81RwJT0TXr5T.s/HScYaxKqEr.jh48DU0Au8on.Rqrim',
    },
  ];

  for (const defaultUser of defaultUsers) {
    // Verificar se o usuário já existe
    const existingDefaultUser = await prisma.usuario.findUnique({
      where: { email: defaultUser.email },
    });

    // Se o usuário não existir, criá-lo
    if (!existingDefaultUser) {
      await prisma.usuario.create({
        data: {
          id: defaultUser.id,
          email: defaultUser.email,
          senha: defaultUser.senha,
          tipo: defaultUser.tipo as 'Administrador' | 'Cliente',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
