import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { FiCalendar, FiSave } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { enGB } from "date-fns/locale";
import { format } from "date-fns";
import useStore from "@/store";
import PageHeader from "@/components/Layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  FormGrid,
  FormLabel,
  Select,
  TextArea,
  TextInput,
} from "@/components/ui/Form";
import { Container, Row, Stack } from "@/components/ui/Layout";
import { PageTitle } from "@/components/ui/Typography";
import handleSubmit from "@/utils/components/CardForm/handleSubmit";
import getCurrentDate from "@/utils/components/CardForm/getCurrentDate";
import getCurrentTime from "@/utils/components/CardForm/getCurrentTime";

const CATEGORIES = ["Sports", "Culture", "Food", "Outdoor", "Others"];

export default function CardForm({
  onCancel,
  existingActivityData,
  pageTitle,
}) {
  const router = useRouter();
  const { id } = router.query;
  const endpoint = existingActivityData
    ? `/api/activities/${id}`
    : "/api/activities";
  const method = existingActivityData ? "PUT" : "POST";
  const { mutate } = useSWR(endpoint);
  const { data: session, status } = useSession();
  const {
    setIsEditMode,
    isEditMode,
    showDayPicker,
    setShowDayPicker,
    selectedTime,
    setSelectedTime,
    selectedCategory,
    setSelectedCategory,
    selectedDate,
    setSelectedDate,
  } = useStore();

  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (existingActivityData) {
      inputRef.current.focus();

      const { date, category } = existingActivityData;
      setSelectedDate(date ? new Date(date) : null);
      setSelectedCategory(category || "");
      setSelectedTime(existingActivityData.time || getCurrentTime());
    }
    handleChange();
  }, [
    existingActivityData,
    setSelectedDate,
    setSelectedCategory,
    setSelectedTime,
  ]);

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setShowDayPicker(false);
  };

  const handleInputChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const toggleDayPicker = () => setShowDayPicker((prev) => !prev);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <Container>
      <Stack
        as="form"
        $gap="l"
        onSubmit={(event) =>
          handleSubmit(
            event,
            session,
            endpoint,
            method,
            onCancel,
            setIsEditMode,
            isEditMode,
            mutate
          )
        }
      >
        <PageHeader />
        {pageTitle && <PageTitle>{pageTitle}</PageTitle>}

        <StyledNameCard $category={selectedCategory}>
          <StyledNameInput
            ref={inputRef}
            type="text"
            id="name"
            name="name"
            aria-label="Activity name"
            autoComplete="off"
            minLength="3"
            maxLength="18"
            placeholder="My activity"
            defaultValue={existingActivityData?.name || ""}
            autoFocus
            required
          />
        </StyledNameCard>

        <Card $padded>
          <Stack $gap="l">
            <FormGrid>
              <FormLabel htmlFor="author">Author:</FormLabel>
              <TextInput
                type="text"
                id="author"
                name="author"
                autoComplete="off"
                defaultValue={existingActivityData?.author || ""}
                required
              />

              <FormLabel htmlFor="date">Date:</FormLabel>
              <StyledDateField>
                <TextInput
                  type="text"
                  id="date"
                  name="date"
                  autoComplete="off"
                  value={
                    selectedDate
                      ? format(selectedDate, "yyyy-MM-dd")
                      : existingActivityData?.date
                      ? existingActivityData.date
                      : getCurrentDate()
                  }
                  readOnly
                  onClick={toggleDayPicker}
                  onChange={handleInputChange}
                  required
                />
                <StyledIconToggle
                  type="button"
                  onClick={toggleDayPicker}
                  aria-label="Choose date"
                  aria-expanded={showDayPicker}
                >
                  <FiCalendar />
                </StyledIconToggle>
                {showDayPicker && (
                  <StyledDayPicker
                    onDayClick={handleDayClick}
                    selected={selectedDate}
                    modifiers={{ disabled: { before: new Date() } }}
                    locale={enGB}
                  />
                )}
              </StyledDateField>

              <FormLabel htmlFor="time">Time:</FormLabel>
              <TextInput
                type="time"
                id="time"
                name="time"
                autoComplete="off"
                defaultValue={existingActivityData?.time || selectedTime}
                required
              />

              <FormLabel htmlFor="location">Location:</FormLabel>
              <TextInput
                type="text"
                id="location"
                name="location"
                autoComplete="off"
                defaultValue={existingActivityData?.location || ""}
                required
              />

              <FormLabel htmlFor="category">Category:</FormLabel>
              <Select
                id="category"
                name="category"
                defaultValue={existingActivityData?.category || ""}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Choose…</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FormGrid>

            <Stack $gap="s">
              <FormLabel htmlFor="description" as="label">
                Description:
              </FormLabel>
              <TextArea
                ref={textareaRef}
                onChange={handleChange}
                autoComplete="off"
                id="description"
                name="description"
                defaultValue={existingActivityData?.description || ""}
                placeholder="Add more details..."
              />
            </Stack>
          </Stack>
        </Card>

        <Row $justify="center" $gap="m">
          <Button onClick={onCancel} $square aria-label="Cancel">
            <TbArrowBack />
          </Button>
          <Button type="submit" $square aria-label="Save activity">
            <FiSave />
          </Button>
        </Row>
      </Stack>
    </Container>
  );
}

const StyledNameCard = styled(Card)`
  display: flex;
  align-items: center;
  min-height: var(--card-height);
  padding-inline: var(--space-m);
`;

const StyledNameInput = styled.input`
  width: 100%;
  padding: 0;
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  text-align: center;
  background-color: transparent;
  border: none;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus-visible {
    outline: none;
  }
`;

const StyledDateField = styled.div`
  position: relative;
  display: flex;
  align-items: end;
`;

const StyledIconToggle = styled.button`
  position: absolute;
  right: 0;
  bottom: var(--space-xs);
  display: flex;
  padding: 0;
  background: none;
  border: none;

  svg {
    width: var(--icon-m);
    height: var(--icon-m);
  }
`;

const StyledDayPicker = styled(DayPicker)`
  --rdp-cell-size: var(--control-m);
  --rdp-accent-color: var(--color-confirm);
  --rdp-background-color: var(--color-confirm-soft);

  position: absolute;
  top: calc(100% + var(--space-s));
  right: 0;
  z-index: var(--z-popover);
  margin: 0;
  padding: var(--space-s);
  font-family: var(--font-heading);
  background-color: var(--color-bg);
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-m);

  .rdp-caption_label {
    font-size: var(--font-size-s);
  }

  .rdp-day_selected,
  .rdp-day_selected:hover {
    color: var(--color-text);
  }
`;
