import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormGrid, FormLabel, Select, TextInput } from "@/components/ui/Form";
import { Collapsible, Stack } from "@/components/ui/Layout";
import { SectionTitle } from "@/components/ui/Typography";
import { CATEGORIES } from "@/utils/categories";

export default function Filter({ onSubmit, showFilterWindow }) {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleAuthorChange = (event) => {
    const value = event.target.value;
    setAuthor(value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ author, category });
  };

  return (
    <Collapsible open={showFilterWindow}>
      <Card as="form" $padded onSubmit={handleSubmit}>
        <Stack $gap="l">
          <SectionTitle>Filter</SectionTitle>
          <FormGrid>
            <FormLabel htmlFor="author">Von:</FormLabel>
            <TextInput
              type="search"
              id="author"
              placeholder="Name …"
              value={author}
              onChange={handleAuthorChange}
            />
            <FormLabel htmlFor="category">Kategorie:</FormLabel>
            <Select
              id="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Alle Kategorien</option>
              {CATEGORIES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </FormGrid>
          <Button type="submit" $size="l" $wide>
            Anwenden
          </Button>
        </Stack>
      </Card>
    </Collapsible>
  );
}
