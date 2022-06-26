const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

type Props = {
  post: {
    id: string;
    reactions: typeof reactionEmoji;
  };
};

const ReactionButtons: React.FC<Props> = ({ post }) => {
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={
          () => console.log("hola")
          // dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {/* {emoji} {post.reactions[name]} */}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
