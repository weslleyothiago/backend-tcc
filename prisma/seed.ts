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

  const artistas = [
    "Adele", "Alicia Keys", "Ariana Grande", "Beyoncé", "Billie Eilish", "Bruno Mars",
    "Camila Cabello", "Celine Dion", "Charlie Puth", "Chris Brown", "Christina Aguilera",
    "Coldplay", "David Bowie", "Demi Lovato", "Drake", "Ed Sheeran", "Elton John", "Emily Sande",
    "Eminem", "Evanescence", "Florence Welch", "Frank Ocean", "George Michael", "Imagine Dragons",
    "James Blunt", "Janet Jackson", "Jennifer Lopez", "Jessie J", "John Legend", "Jorja Smith",
    "Justin Bieber", "Katy Perry", "Kesha", "Lady Gaga", "Lana Del Rey", "Leonard Cohen", "Lizzo",
    "Lordes", "Mariah Carey", "Mark Ronson", "Miley Cyrus", "Michael Jackson", "Nicki Minaj",
    "Nina Simone", "Norah Jones", "Olivia Rodrigo", "Pink", "Prince", "Rihanna", "Robbie Williams",
    "Sam Smith", "Shakira", "Shawn Mendes", "Sia", "Taylor Swift", "The Weeknd", "Tina Turner",
    "Troye Sivan", "U2", "Usher", "Whitney Houston", "Yoko Ono", "Zayn Malik", "Kanye West", "Lil Wayne",
    "Post Malone", "Drake", "Travis Scott", "Kendrick Lamar", "J. Cole", "Cardi B", "Migos", "Snoop Dogg",
    "Jay-Z", "Lil Nas X", "Doja Cat", "Tyler, The Creator", "A$AP Rocky", "Nas", "Meek Mill", "Future",
    "Megan Thee Stallion", "21 Savage", "Lil Uzi Vert", "Chief Keef", "Mac Miller", "Logic", "Chance the Rapper",
    "Big Sean", "The Notorious B.I.G.", "Tupac Shakur", "Ice Cube", "Public Enemy", "N.W.A", "Wu-Tang Clan",
    "OutKast", "Eminem", "Missy Elliott", "Lauryn Hill", "M.I.A.", "Queen Latifah", "Salt-N-Pepa", "Busta Rhymes",
    "Run DMC", "Beastie Boys", "KRS-One", "Rakim", "Dr. Dre", "A Tribe Called Quest", "De La Soul", "The Roots",
    "Lil Kim", "Eve", "Foxy Brown", "Nicki Minaj", "Cardi B"
  ];

  // Iterando sobre a lista de artistas e adicionando no banco de dados
  for (const nome of artistas) {
    // Gerar o slug a partir do nome do artista
    const slug = nome.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    // Verificar se o artista já existe
    const existingArtist = await prisma.artista.findUnique({
      where: { slug: slug },
    });

    // Se o artista não existir, criar
    if (!existingArtist) {
      await prisma.artista.create({
        data: {
          nome: nome,
          slug: slug,
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
