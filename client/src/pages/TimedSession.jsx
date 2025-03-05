import useSessionOptions from "../contexts/useSessionOptions";
import { useNavigate } from "react-router-dom";
import { Title, Group, Button } from "@mantine/core";

const TimedSession = () => {
  const { selections } = useSessionOptions();
  const navigate = useNavigate();

  return (
    <div>
      <Title order={2}>Timed Session</Title>
      <Group>
        <Button>Pause Session</Button>
        <Button
          onClick={() => {
            navigate("/timed-session/review");
          }}
        >
          End Session
        </Button>
        Image
        <Button>Skip</Button>
      </Group>
      <p>Subject: {selections.subject}</p>
      <p>Gender: {selections.gender}</p>
      <p>Clothing: {selections.clothing}</p>
      <p>Interval: {selections.interval} min</p>
      <p>Number of images: {selections.number}</p>
      <p>
        Total session length: {selections.interval * selections.number} minutes
      </p>
    </div>
  );
};

export default TimedSession;
