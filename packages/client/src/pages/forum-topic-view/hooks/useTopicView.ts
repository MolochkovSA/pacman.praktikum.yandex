// import { useCallback, useEffect, useState } from 'react';
// import { getTopicView } from '../api/getTopicView';
// import { TopicView, CommentView } from '../model/types';

// export const useTopicView = (id: number) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [topic, setTopic] = useState<TopicView | null>(null);
//   const [comments, setComments] = useState<CommentView[]>([]);
//   const [total, setTotal] = useState(0);

//   const loadTopicView = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const data = await getTopicView({ id });

//       const mappedTopic: TopicView = {
//         id,
//         title: data.title,
//         themeDescription: data.themeDescription,
//         text: data.text,
//         createdAt: new Date(data.createdAt),
//         author: data.author,

//         comments: data.comments.map((c) => ({
//           id: c.id,
//           text: c.text,
//           createdAt: new Date(c.createdAt),
//           author: c.author,
//           reactions: c.reactions || []
//         }))
//       };

//       setTopic(mappedTopic);
//       setComments(mappedTopic.comments);
//       setTotal(mappedTopic.comments?.length);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     loadTopicView();
//   }, [loadTopicView]);

//   return { isLoading, topic, comments, total, loadTopicView };
// };
import { useEffect, useRef, useState } from 'react';
import { getTopicView } from '../api/getTopicView';
import { TopicView, CommentView } from '../model/types';

export const useTopicView = (id: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState<TopicView | null>(null);
  const [comments, setComments] = useState<CommentView[]>([]);
  const [total, setTotal] = useState(0);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current?.abort(); // отменяем предыдущий
    abortRef.current = controller;

    setIsLoading(true);

    getTopicView({ id, signal: controller.signal })
      .then((data) => {
        const mappedTopic: TopicView = {
          id,
          title: data.title,
          themeDescription: data.themeDescription,
          text: data.text,
          createdAt: new Date(data.createdAt),
          author: data.author,
          comments: data.comments.map((c) => ({
            id: c.id,
            text: c.text,
            createdAt: new Date(c.createdAt),
            author: c.author,
            reactions: c.reactions || []
          }))
        };

        setTopic(mappedTopic);
        setComments(mappedTopic.comments);
        setTotal(mappedTopic.comments?.length);
      })
      .catch((e) => {
        if (e.name !== 'AbortError') {
          console.error(e);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort(); // отменяем при размонтировании или смене id
    };
  }, [id]);

  return { isLoading, topic, comments, total };
};
