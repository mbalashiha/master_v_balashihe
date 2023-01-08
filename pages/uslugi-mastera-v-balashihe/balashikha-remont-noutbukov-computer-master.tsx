import { ArticleLayout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Article } from "@components/common/Article";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Head>
        <title>
          Компьютерный мастер - Ремонт ноутбуков в Балашихе в день обращения у
          Вас дома или в офисном центре
        </title>
        <meta
          name="description"
          content="Компьютерный мастер - Ремонт ноутбуков в Балашихе в день обращения у Вас дома или в офисном центре"
        />
      </Head>
      <Article
        title={`Ремонт ноутбуков в Балашихе в день обращения у Вас дома или в офисном центре`}
        image={
          <Image
            width={922}
            height={663}
            alt="Ремонт ноутбуков в Балашихе в день обращения у Вас дома"
            src="/images/pages/balashiha-remont-compute-hardware.webp"
          />
        }
      >
        <Typography component="h2" variant="h2" gutterBottom>
          Вам нужен срочный ремонт Вашего компьютера или ноутбука, или
          моноблока, без посещения сервисного центра?
        </Typography>
        <p>
          Мастер приедет в течении часа, если Вы живёте в центре города
          Балашиха. Цена низкая, так как компьютерный мастер тратит мало времени
          на дорогу. Ремонт производится без каких-либо скрытых наценок.
        </p>
        <Typography component="h2" variant="h2" gutterBottom>
          Какие услуги по ремонту ноутбоков с выездом к клиенту я оказываю:
        </Typography>
        <Paper>
          <ul>
            <li>Всегда бесплатная диагностика устройства</li>
            <li>Почему ноутбук не работает или не включается?</li>
            <li>Ремонт или замена дискретной видеокарты ноутбука</li>
            <li>Экран ноутбука не выводить изображение</li>
            <li>Диагностика, ремонт или замена материской платы ноутбука</li>
            <li>Физическое повреждение матрицы экрана ноутбука</li>
            <li>Сушка и очистка ноутбука после залития водой</li>
            <li>Замена жёсткого диска ноутбука с HDD на SSD накопитель</li>
            <li>Диагностика тротлинга (сбрасывания частот) ноутбука</li>
            <li>Мониторинг температуры ноутбука</li>
            <li>
              Замена термопасты, термопрокладок и актисвного охлождения ноубука
            </li>
            <li>Перепрошивка BIOS ноутбука с помощью программатора</li>
          </ul>
        </Paper>
        <p>
          Современные ноутбуки стали сверхпроизводительными. Понятно, что все
          пользуются ноутбуками. Как и другая компьютерная техника современные
          ноутбуки очень сложны и требуют квалифицированного мастера инженера
          для аппаратного ремонта. У современных людей нет свободного времена
          для того чтобы доставить устройство в сервисный центр. Если для Вас
          нет возможности посетить сервисный центр по ремонту ноутбуков в
          Балашиха, Вы можете заказать ремонт и настройку ноутбука дешево в
          Балашихе и вызвать человека к себе домой, или в офис в центре
          Балашихи. Вы можете вызвать специалиста по сервисному обслуживанию и
          ремонту электроники в любое время по единому фиксированному тарифу
          стоимости услуг. Также инженер мастер может отвезти любоё ваше
          устройство ПК или ноутбук в сервисный центр самостоятельно, при этом
          услуга по транспортировке входит в стоимость ремонта.
        </p>
        <p>
          Возможна замена и модернизация любых комплектующих ноутбука в короткий
          срок. Я осуществляю ремонт ПК и ноутбуков максимально оперативно для
          всей территории города Балашиха и МКАД. Консультация с опытным
          мастером по телефону бесплатна всегда. Опыт инженера в ремонте
          ноутбуков и оказании услуг комьютерной помощи позволяет решить
          большинство проблем в тот же день.
        </p>
      </Article>
    </>
  );
}
Page.Layout = ArticleLayout;
