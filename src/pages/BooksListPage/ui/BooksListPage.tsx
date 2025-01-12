/* eslint-disable max-len */
import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { BookList, ListViewSwitcher } from "entities/Book";
import { EBookListView } from "entities/Book/model/types";
import { AsyncModule, ReducerListT } from "shared/ui/AsyncModule/AsyncModule";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Page } from "widgets/Page/Page";
import { Text } from "shared/ui/Text/Text";
import { TextTheme } from "shared/ui/Text";
import { bookListPageActions, bookListPageReducer, getBooks } from "../model/slices";
import cls from "./BooksListPage.module.scss";
import { fetchNextBookList } from "../model/services";
import { getBooksListPageError, getBooksListPageIsStateInit, getBooksListPageListView, getBooksListPageLoading } from "../model/selectors";
import { initBookListPage } from "../model/services/initBookListPage";

interface IBooksListPageProps {
  className?: string;
}

// const books: IBook[] = [
//   {
//     id: 1,
//     owner: 1,
//     title: "Fahrenheit 451",
//     subTitle: "Ray Bradbury",
//     img: "http://localhost:3000/images/Fahrenheit451.jpg",
//     views: 1,
//     createdAt: "1.12.2025",
//     hashTagType: [
//       EBookOfHashTagType.IT,
//       EBookOfHashTagType.ECONOMICS,
//       EBookOfHashTagType.POETRY,
//       EBookOfHashTagType.SCIENCE,
//     ],
//     blocks: [
//       {
//         id: "1",
//         type: EBlockOfBookType.TEXT,
//         title: "Description",
//         paragraphs: [
//           "Fahrenheit 451 is a 1953 dystopian novel by American writer Ray Bradbury. It presents a future American society where books have been outlawed and \"firemen\" burn any that are found. The novel follows in the viewpoint of Guy Montag, a fireman who soon becomes disillusioned with his role of censoring literature and destroying knowledge, eventually quitting his job and committing himself to the preservation of literary and cultural writings.",
//           "Fahrenheit 451 was written by Bradbury during the Second Red Scare and the McCarthy era, inspired by the book burnings in Nazi Germany and by ideological repression in the Soviet Union. Bradbury's claimed motivation for writing the novel has changed multiple times. In a 1956 radio interview, Bradbury said that he wrote the book because of his concerns about the threat of burning books in the United States. In later years, he described the book as a commentary on how mass media reduces interest in reading literature. In a 1994 interview, Bradbury cited political correctness as an allegory for the censorship in the book, calling it \"the real enemy these days\" and labeling it as \"thought control and freedom of speech control.\""
//         ]
//       },
//       {
//         id: "2",
//         type: EBlockOfBookType.CODE,
//         code: "<div>\n  <p>hi</p>\n</div>"
//       },
//       {
//         id: "5",
//         type: EBlockOfBookType.IMAGE,
//         src: "http://localhost:3000/images/img3.jpg",
//         title: "Awesome Image ever seen"
//       },
//       {
//         id: "11",
//         type: EBlockOfBookType.TEXT,
//         title: "",
//         paragraphs: [
//           "The writing and theme within Fahrenheit 451 was explored by Bradbury in some of his previous short stories. Between 1947 and 1948, Bradbury wrote \"Bright Phoenix\", a short story about a librarian who confronts a \"Chief Censor\", who burns books. An encounter Bradbury had in 1949 with the police inspired him to write the short story \"The Pedestrian\" in 1951. In \"The Pedestrian\", a man going for a nighttime walk in his neighborhood is harassed and detained by the police. In the society of \"The Pedestrian\", citizens are expected to watch television as a leisurely activity, a detail that would be included in Fahrenheit 451. Elements of both \"Bright Phoenix\" and \"The Pedestrian\" would be combined into The Fireman, a novella published in Galaxy Science Fiction in 1951. Bradbury was urged by Stanley Kauffmann, an editor at Ballantine Books, to make The Fireman into a full novel. Bradbury finished the manuscript for Fahrenheit 451 in 1953, and the novel was published later that year."
//         ]
//       }
//     ]
//   }
// ];

const reducers: ReducerListT = {
  bookListPage: bookListPageReducer
};

const BooksListPage = ({ className }: IBooksListPageProps) => {
  const { t } = useTranslation("book");

  const dispatch = useAppDispatch();

  // SELECTORS
  const bookArr = useSelector(getBooks.selectAll);
  const isLoading = useSelector(getBooksListPageLoading);
  const error = useSelector(getBooksListPageError);
  const listView = useSelector(getBooksListPageListView);
  const isStateInit = useSelector(getBooksListPageIsStateInit);

  const onNextChunk = useCallback(() => {
    dispatch(fetchNextBookList());
  }, [dispatch]);

  /** FOR INIT STATE ONLY */
  useEffect(() => {
    if (__PROJECT_TYPE__ !== "storybook") {
      dispatch(initBookListPage());
    }
  }, [dispatch, isStateInit]);

  const onChangeViewHandler = useCallback((newListView: EBookListView) => {
    dispatch(bookListPageActions.setView(newListView));
  }, [dispatch]);

  return (
    <AsyncModule reducers={reducers} isRemoveAfterUnmount={false}>
      <Page
        onNextChunk={onNextChunk}
        className={classes(cls.BooksListPage, {}, [className])}
      >

        <h1 data-testid="BooksListPage">{t("Книги")}</h1>

        {error ? (
          <Text theme={TextTheme.ERROR} title={t("Ошибка")} text={error} />
        ) : (
          <>
            <ListViewSwitcher listView={listView} onViewIconClickHandler={onChangeViewHandler} />

            <BookList
              isLoading={isLoading}
              bookArr={bookArr}
              listView={listView}
            />
          </>
        )}
      </Page>
    </AsyncModule>
  );
};

export default memo(BooksListPage);
