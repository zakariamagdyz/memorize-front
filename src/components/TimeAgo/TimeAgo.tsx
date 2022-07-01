import { parseISO, formatDistanceToNow } from "date-fns";

type Props = {
  timestamp: string;
};
const TimeAgo: React.FC<Props> = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp} style={{ fontSize: ".8em" }}>
      {timeAgo}
    </span>
  );
};
export default TimeAgo;
