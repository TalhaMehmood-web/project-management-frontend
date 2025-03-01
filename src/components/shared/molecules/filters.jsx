"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon, SearchIcon, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SelectFieldRenderer from "../ui/select-field-renderer";

const Filters = ({ filters, setFilters, fields }) => {
  const { register, handleSubmit, reset, control } = useForm({});

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data) => {
    setFilters(data);
  };

  const handleClear = () => {
    console.log("clicked clear");
    setFilters({});
    reset({});
  };

  return (
    <div className="flex flex-col w-full gap-2 py-4">
      <div className="flex justify-end w-full">
        <Button
          className="hover:bg-blue-500 hover:text-white"
          size="lg"
          variant="link"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FilterIcon className="mr-2" />
          Filters
          <motion.span
            animate={{ rotate: isOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            className="ml-2 inline-block"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </Button>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="filter-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="">
              <CardContent className="p-4 ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {fields?.map((field) =>
                      field?.type === "select" ? (
                        <SelectFieldRenderer
                          key={field.id}
                          name={field.name}
                          label={field.label}
                          control={control}
                          selectItems={field.options}
                        />
                      ) : (
                        <div key={field.id} className="flex flex-col">
                          <label
                            htmlFor={field.id}
                            className="mb-1 font-medium"
                          >
                            {field.label}
                          </label>
                          <Input
                            id={field.id}
                            type={field.type}
                            {...register(field.id)}
                            {...field.props}
                          />
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="lg"
                      variant="outline"
                      type="button"
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                    <Button
                      className="hover:bg-transparent hover:text-green-500  "
                      size="lg"
                      variant="success"
                      type="submit"
                    >
                      <SearchIcon />
                      Submit
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
