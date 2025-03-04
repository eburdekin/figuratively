import useSessionOptions from "../contexts/useSessionOptions";

const TimedSession = () => {
  const { selections } = useSessionOptions();

  return (
    <div>
      <h2>Session Settings</h2>
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
