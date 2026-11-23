import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { FiCalendar, FiSave } from "react-icons/fi";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { de } from "date-fns/locale";
import { format } from "date-fns";
import useStore from "@/store";
import PageHeader from "@/components/Layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  FormGrid,
  FormLabel,
  PickerField,
  PickerToggle,
  TextArea,
  TextInput,
  pickerOptionStyles,
  popoverStyles,
} from "@/components/ui/Form";
import TimePicker from "@/components/TimePicker";
import SelectMenu from "@/components/ui/SelectMenu";
import useDismiss from "@/hooks/useDismiss";
import { Container, Stack } from "@/components/ui/Layout";
import handleSubmit from "@/utils/components/CardForm/handleSubmit";
import getCurrentDate from "@/utils/components/CardForm/getCurrentDate";
import getCurrentTime from "@/utils/components/CardForm/getCurrentTime";
import { CATEGORIES } from "@/utils/categories";

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
  const datePickerRef = useRef(null);
  useDismiss(datePickerRef, showDayPicker, () => setShowDayPicker(false));

  useEffect(() => {
    if (existingActivityData) {
      inputRef.current.focus();

      const { date, category } = existingActivityData;
      setSelectedDate(date ? new Date(date) : null);
      setSelectedCategory(category || "");
      setSelectedTime(existingActivityData.time || getCurrentTime());
    } else {
      setSelectedDate(null);
      setSelectedCategory("");
      setSelectedTime(getCurrentTime());
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
        <PageHeader title={pageTitle} close={onCancel} />

        <StyledNameCard $category={selectedCategory}>
          <StyledNameInput
            ref={inputRef}
            type="text"
            id="name"
            name="name"
            aria-label="Name der Aktivität"
            autoComplete="off"
            minLength="3"
            placeholder="Meine Aktivität"
            defaultValue={existingActivityData?.name || ""}
            autoFocus
            required
          />
        </StyledNameCard>

        <Card $padded>
          <Stack $gap="l">
            <FormGrid>
              <FormLabel htmlFor="author">Von:</FormLabel>
              <TextInput
                type="text"
                id="author"
                name="author"
                autoComplete="off"
                defaultValue={existingActivityData?.author || ""}
                required
              />

              <FormLabel htmlFor="date">Datum:</FormLabel>
              <PickerField ref={datePickerRef}>
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
                <PickerToggle
                  onClick={toggleDayPicker}
                  aria-label="Datum wählen"
                  aria-expanded={showDayPicker}
                >
                  <FiCalendar />
                </PickerToggle>
                {showDayPicker && (
                  <StyledDayPicker
                    onDayClick={handleDayClick}
                    selected={selectedDate}
                    modifiers={{ disabled: { before: new Date() } }}
                    locale={de}
                  />
                )}
              </PickerField>

              <FormLabel htmlFor="time">Uhrzeit:</FormLabel>
              <TimePicker
                id="time"
                name="time"
                value={selectedTime}
                onChange={setSelectedTime}
              />

              <FormLabel htmlFor="location">Ort:</FormLabel>
              <TextInput
                type="text"
                id="location"
                name="location"
                autoComplete="off"
                defaultValue={existingActivityData?.location || ""}
                required
              />

              <FormLabel htmlFor="category">Kategorie:</FormLabel>
              <SelectMenu
                id="category"
                name="category"
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={CATEGORIES}
                required
              />
            </FormGrid>

            <Stack $gap="s">
              <FormLabel htmlFor="description">Beschreibung:</FormLabel>
              <TextArea
                ref={textareaRef}
                onChange={handleChange}
                autoComplete="off"
                id="description"
                name="description"
                defaultValue={existingActivityData?.description || ""}
                placeholder="Was ist geplant? Was sollte man mitbringen?"
              />
            </Stack>
          </Stack>
        </Card>

        <Button type="submit" $wide>
          Speichern
          <FiSave />
        </Button>
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

const StyledDayPicker = styled(DayPicker)`
  --rdp-cell-size: var(--field-height);

  ${popoverStyles}

  .rdp-caption_label {
    font-size: var(--font-size-s);
  }

  .rdp-button {
    border: none;
  }

  .rdp-day {
    ${pickerOptionStyles}
  }

  /* react-day-picker marks the selected day with its own class */
  .rdp-day_selected,
  .rdp-day_selected:hover {
    color: var(--color-text);
    background-color: var(--color-confirm);
  }

  .rdp-day_today {
    font-weight: 700;
  }
`;
