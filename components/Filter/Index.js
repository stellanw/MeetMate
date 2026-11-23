import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormGrid, FormLabel, TextInput } from "@/components/ui/Form";
import SelectMenu from "@/components/ui/SelectMenu";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ author, category });
  };

  return (
    <Collapsible open={showFilterWindow}>
      <Card as="form" $padded onSubmit={handleSubmit}>
        <Stack $gap="m">
          <SectionTitle>Filter</SectionTitle>
          <FormGrid>
            <FormLabel htmlFor="filter-author">Von:</FormLabel>
            <TextInput
              type="search"
              id="filter-author"
              placeholder="Name …"
              value={author}
              onChange={handleAuthorChange}
            />
            <FormLabel htmlFor="filter-category">Kategorie:</FormLabel>
            <SelectMenu
              id="filter-category"
              value={category}
              onChange={setCategory}
              options={[{ value: "", label: "Alle Kategorien" }, ...CATEGORIES]}
            />
          </FormGrid>
          <Button type="submit" $wide>
            Anwenden
          </Button>
        </Stack>
      </Card>
    </Collapsible>
  );
}
