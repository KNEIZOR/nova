import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("demo12345", 12);

  await prisma.admin.upsert({
    where: { email: "admin@nova.local" },
    update: { passwordHash },
    create: {
      email: "admin@nova.local",
      passwordHash
    }
  });

  await prisma.service.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Дизайн интерьера",
        slug: "design",
        shortDescription: "Проектируем интерьер под ваш образ жизни, задачи и бюджет.",
        description: "Планировочные решения, концепция, 3D-визуализация и рабочая документация.",
        priceFrom: 2500,
        image: "/images/services/design.jpg",
        features: ["Планировка", "3D-визуализация", "Рабочие чертежи", "Подбор материалов"],
        sortOrder: 1
      },
      {
        title: "Ремонт под ключ",
        slug: "renovation",
        shortDescription: "Берём на себя реализацию проекта от подготовки помещения до финальной отделки.",
        description: "Организуем строительные и отделочные работы и контролируем соответствие проекту.",
        priceFrom: 6500,
        image: "/images/services/renovation.jpg",
        features: ["Демонтаж", "Черновые работы", "Инженерные системы", "Отделка"],
        sortOrder: 2
      },
      {
        title: "Авторский надзор",
        slug: "supervision",
        shortDescription: "Контролируем соответствие работ проекту и качество реализации.",
        description: "Проверяем подрядчиков, материалы, сроки и соответствие принятым решениям.",
        priceFrom: null,
        image: "/images/services/supervision.jpg",
        features: ["Контроль работ", "Проверка материалов", "Контроль сроков", "Отчёты"],
        sortOrder: 3
      },
      {
        title: "Комплектация",
        slug: "furnishing",
        shortDescription: "Подбираем и организуем поставку материалов, мебели, света и декора.",
        description: "Берём на себя подбор, согласование и логистику ключевых элементов интерьера.",
        priceFrom: null,
        image: "/images/services/furnishing.jpg",
        features: ["Материалы", "Мебель", "Освещение", "Декор"],
        sortOrder: 4
      }
    ]
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Тёплый минимализм",
        slug: "warm-minimalism",
        description: "Спокойный интерьер с натуральными фактурами и мягкой палитрой.",
        city: "Санкт-Петербург",
        area: 86,
        category: "Квартира",
        image: "/images/projects/project-1.jpg",
        images: ["/images/projects/project-1.jpg"],
        sortOrder: 1
      },
      {
        title: "Современная классика",
        slug: "modern-classic",
        description: "Сдержанный интерьер с классическими деталями и современной функциональностью.",
        city: "Москва",
        area: 124,
        category: "Квартира",
        image: "/images/projects/project-2.jpg",
        images: ["/images/projects/project-2.jpg"],
        sortOrder: 2
      },
      {
        title: "Городской минимализм",
        slug: "city-minimalism",
        description: "Функциональное пространство для динамичного городского образа жизни.",
        city: "Москва",
        area: 72,
        category: "Квартира",
        image: "/images/projects/project-3.jpg",
        images: ["/images/projects/project-3.jpg"],
        sortOrder: 3
      }
    ]
  });

  await prisma.review.createMany({
    data: [
      {
        author: "Анна и Михаил",
        text: "Для нас было важно не заниматься ремонтом самостоятельно. Команда полностью организовала процесс.",
        object: "Квартира · 86 м²",
        rating: 5,
        sortOrder: 1
      },
      {
        author: "Екатерина",
        text: "Понравилось, что все вопросы решались через одного менеджера. Нам не пришлось постоянно контролировать подрядчиков.",
        object: "Дом · 180 м²",
        rating: 5,
        sortOrder: 2
      },
      {
        author: "Александр",
        text: "Отдельно отмечу внимание к деталям. Изменения всегда согласовывались до начала работ.",
        object: "Квартира · 72 м²",
        rating: 5,
        sortOrder: 3
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
