/* eslint-disable max-len */
import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "resources/config/routeConfig/routeConfig";
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text";
import { ImageJpg } from "shared/ui/ImageJpg/ImageJpg";
import EyeIon from "shared/assets/icons/eye.svg";
import CalendarIon from "shared/assets/icons/calendar.svg";
import { IconSVG } from "shared/ui/IconSVG/IconSVG";
import cls from "./BooksListPage.module.scss";

interface IBooksListPageProps {
  className?: string;
}

const books = [
  {
    id: 1,
    owner: 1,
    title: "Fahrenheit 451",
    subTitle: "Ray Bradbury",
    img: "http://localhost:3000/images/Fahrenheit451.jpg",
    views: 1,
    createdAt: "1.12.2025",
    hashTagType: [
      "IT"
    ],
    blocks: [
      {
        id: "1",
        type: "TEXT",
        title: "Description",
        paragraphs: [
          "Fahrenheit 451 is a 1953 dystopian novel by American writer Ray Bradbury. It presents a future American society where books have been outlawed and \"firemen\" burn any that are found. The novel follows in the viewpoint of Guy Montag, a fireman who soon becomes disillusioned with his role of censoring literature and destroying knowledge, eventually quitting his job and committing himself to the preservation of literary and cultural writings.",
          "Fahrenheit 451 was written by Bradbury during the Second Red Scare and the McCarthy era, inspired by the book burnings in Nazi Germany and by ideological repression in the Soviet Union. Bradbury's claimed motivation for writing the novel has changed multiple times. In a 1956 radio interview, Bradbury said that he wrote the book because of his concerns about the threat of burning books in the United States. In later years, he described the book as a commentary on how mass media reduces interest in reading literature. In a 1994 interview, Bradbury cited political correctness as an allegory for the censorship in the book, calling it \"the real enemy these days\" and labeling it as \"thought control and freedom of speech control.\""
        ]
      },
      {
        id: "2",
        type: "CODE",
        code: "<div>\n  <p>hi</p>\n</div>"
      },
      {
        id: "5",
        type: "IMAGE",
        src: "http://localhost:3000/images/img3.jpg",
        title: "Awesome Image ever seen"
      },
      {
        id: "11",
        type: "TEXT",
        title: "",
        paragraphs: [
          "The writing and theme within Fahrenheit 451 was explored by Bradbury in some of his previous short stories. Between 1947 and 1948, Bradbury wrote \"Bright Phoenix\", a short story about a librarian who confronts a \"Chief Censor\", who burns books. An encounter Bradbury had in 1949 with the police inspired him to write the short story \"The Pedestrian\" in 1951. In \"The Pedestrian\", a man going for a nighttime walk in his neighborhood is harassed and detained by the police. In the society of \"The Pedestrian\", citizens are expected to watch television as a leisurely activity, a detail that would be included in Fahrenheit 451. Elements of both \"Bright Phoenix\" and \"The Pedestrian\" would be combined into The Fireman, a novella published in Galaxy Science Fiction in 1951. Bradbury was urged by Stanley Kauffmann, an editor at Ballantine Books, to make The Fireman into a full novel. Bradbury finished the manuscript for Fahrenheit 451 in 1953, and the novel was published later that year."
        ]
      }
    ]
  },
  {
    id: 2,
    owner: 1,
    title: "Dandelion Wine",
    subTitle: "Ray Bradbury",
    img: "http://localhost:3000/images/DandelionWine.jpg",
    views: 1,
    createdAt: "1.12.2025",
    hashTagType: [
      "IT"
    ],
    blocks: [
      {
        id: "1",
        type: "TEXT",
        title: "Звголовок",
        paragraphs: [
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perspiciatis id doloremque quisquam expedita optio rem? Voluptatem mollitia animi facere necessitatibus impedit dolorum optio. Veniam, blanditiis! Ipsum unde ducimus est.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perspiciatis id doloremque quisquam expedita optio rem? Voluptatem mollitia animi facere necessitatibus impedit dolorum optio. Veniam, blanditiis! Ipsum unde ducimus est.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perspiciatis id doloremque quisquam expedita optio rem? Voluptatem mollitia animi facere necessitatibus impedit dolorum optio. Veniam, blanditiis! Ipsum unde ducimus est."
        ]
      },
      {
        id: "5",
        type: "IMAGE",
        src: "http://localhost:3000/images/img3.jpg",
        title: "Title Image"
      }
    ]
  }
];

const BooksListPage = ({ className }: IBooksListPageProps) => {
  const { t } = useTranslation("book");

  return (
    <div className={classes(cls.BooksListPage, {}, [className])}>

      <h1>{t("Книги")}</h1>

      {books.map((book) => (
        <AppLink className={cls.topWrapper} key={book.id} to={`${RoutePath.book_details}${book.id}`}>
          <ImageJpg className={cls.bookImage} size={200} alt="*" src={book.img} />
          <div style={{ display: "inline-block", marginLeft: 20 }}>
            <Text
              className={cls.imageDescription}
              textAlign={TextAlign.LEFT}
              title={book.title} // t("Fahrenheit 451")
              text={book.subTitle}
            />
            <div className={cls.info}>
              <span style={{ display: "flex", width: 40, justifyContent: "space-around" }}>
                <IconSVG Svg={EyeIon} />
                <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={String(book.views)} />
              </span>
              <span style={{ display: "flex", width: 80, justifyContent: "space-around", marginLeft: 11 }}>
                <IconSVG Svg={CalendarIon} />
                <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={book.createdAt} />
              </span>
            </div>
          </div>
        </AppLink>
      ))}
      <br />
      <br />
    </div>
  );
};

export default memo(BooksListPage);
