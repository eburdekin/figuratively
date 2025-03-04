import useSessionOptions from "../contexts/useSessionOptions";
import { useNavigate } from "react-router-dom";
import { Title, Stack, Group, Button, Slider } from "@mantine/core";

const TimedSessionOptions = () => {
  const { selections, setSelections } = useSessionOptions();
  const navigate = useNavigate();

  const subjectOptions = [
    { name: "Figure", icon: "" },
    { name: "Face/Expression", icon: "" },
    { name: "Hands", icon: "" },
  ];

  const genderOptions = [
    { name: "All", icon: "" },
    { name: "Male", icon: "" },
    { name: "Female", icon: "" },
  ];

  const clothingOptions = [
    { name: "All", icon: "" },
    { name: "Nude", icon: "" },
    { name: "Clothed", icon: "" },
  ];

  const intervalMarks = [
    { value: 1, label: "1" },
    { value: 30, label: "30" },
  ];

  const numberMarks = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
  ];

  return (
    <Stack gap="xl">
      <Title order={2}>Timed Session</Title>
      <Group>
        Subject
        {subjectOptions.map((option) => {
          return (
            <Button
              key={option.name}
              variant={
                selections.subject === option.name ? "filled" : "default"
              }
              onClick={(e) => {
                setSelections({
                  ...selections,
                  subject: e.target.innerText,
                });
              }}
            >
              {option.name}
            </Button>
          );
        })}
      </Group>
      <Group>
        Gender
        {genderOptions.map((option) => {
          return (
            <Button
              key={option.name}
              variant={selections.gender === option.name ? "filled" : "default"}
              onClick={(e) => {
                setSelections({
                  ...selections,
                  gender: e.target.innerText,
                });
              }}
            >
              {option.name}
            </Button>
          );
        })}
      </Group>
      <Group>
        Clothing
        {clothingOptions.map((option) => {
          return (
            <Button
              key={option.name}
              variant={
                selections.clothing === option.name ? "filled" : "default"
              }
              onClick={(e) => {
                setSelections({
                  ...selections,
                  clothing: e.target.innerText,
                });
              }}
            >
              {option.name}
            </Button>
          );
        })}
      </Group>
      <Group grow>
        Interval (minutes)
        <Slider
          step={1}
          min={1}
          max={30}
          marks={intervalMarks}
          labelAlwaysOn
          value={selections.interval}
          onChange={(e) => {
            setSelections({
              ...selections,
              interval: e,
            });
          }}
        />
        {/* <Button>Custom</Button> */}
      </Group>
      <Group grow>
        Number of images
        <Slider
          step={10}
          min={10}
          max={40}
          marks={numberMarks}
          labelAlwaysOn
          value={selections.number}
          onChange={(e) =>
            setSelections({
              ...selections,
              number: e,
            })
          }
        />
      </Group>
      Session length:
      {parseInt(selections.interval) * parseInt(selections.number)} minutes
      <Button onClick={() => navigate("/timed-session")}>Start session</Button>
    </Stack>
  );
};

export default TimedSessionOptions;
