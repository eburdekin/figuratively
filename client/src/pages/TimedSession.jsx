import { Group, Button } from "@mantine/core";

const TimedSession = () => {
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
    { name: "Clothed", icon: "" },
    { name: "Nude", icon: "" },
  ];

  return (
    <>
      Timed Session
      <Group>
        Subject
        {subjectOptions.map((option) => {
          return <Button key={option.name}>{option.name}</Button>;
        })}
      </Group>
      <Group>
        Gender
        {genderOptions.map((option) => {
          return <Button key={option.name}>{option.name}</Button>;
        })}
      </Group>
      <Group>
        Clothing
        {clothingOptions.map((option) => {
          return <Button key={option.name}>{option.name}</Button>;
        })}
      </Group>
    </>
  );
};

export default TimedSession;
