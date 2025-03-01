"use client";
import DatePicker from "@/components/shared/molecules/date-picker";
import Input from "@/components/shared/ui/input-field-renderer";
import Select from "@/components/shared/ui/select-field-renderer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import React from "react";
import { useForm } from "react-hook-form";

const CreateProjectForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectTitle: "",
      taskView: "",
      projectPrivacy: "",
      projectTeam: "",
      assignee: "",
      projectLead: "",
      startDate: null,
      dueDate: null,
      projectOverview: "",
      client: "",
      budget: "",
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 justify-between  flex-col gap-10"
    >
      <div className="grid   grid-cols-1 md:grid-cols-2  gap-5">
        <Input
          containerClassName="flex flex-col flex-1 w-full gap-2 "
          labelClassName="text-sm font-bold"
          label="Project Title"
          placeholder="Project Title"
          {...register("projectTitle")}
        />

        <Select
          name="taskView"
          control={control}
          label="Select Task View"
          selectItems={[
            { value: "technical", label: "technical" },
            { value: "external", label: "external" },
            { value: "organizational", label: "organizational" },
          ]}
          onChange={(value) => setValue("taskView", value)}
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
        <Select
          name={"projectPrivacy"}
          control={control}
          label="Select Privacy"
          selectItems={[
            { value: "one", label: "one" },
            { value: "two", label: "two" },
            { value: "three", label: "three" },
          ]}
          onChange={(value) => setValue("projectPrivacy", value)}
        />
        <Select
          name={"projectTeam"}
          control={control}
          label="Select Team"
          selectItems={[
            { value: "one", label: "one" },
            { value: "two", label: "two" },
            { value: "three", label: "three" },
          ]}
          onChange={(value) => setValue("projectTeam", value)}
        />
        <Select
          name={"assignee"}
          control={control}
          label="Select Assignee"
          selectItems={[
            { value: "one", label: "one" },
            { value: "two", label: "two" },
            { value: "three", label: "three" },
          ]}
          onChange={(value) => setValue("assignee", value)}
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
        <Select
          name={"projectLead"}
          control={control}
          label="Select Admin"
          selectItems={[
            { value: "one", label: "one" },
            { value: "two", label: "two" },
            { value: "three", label: "three" },
          ]}
          onChange={(value) => setValue("projectLead", value)}
        />
        <DatePicker
          label="Start Date"
          onChange={(date) => setValue("startDate", date)}
        />
        <DatePicker
          label="Due Date"
          onChange={(date) => setValue("dueDate", date)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold uppercase text-xs ">Project Overview</Label>
        <Textarea
          placeholder="Project Overview"
          {...register("projectOverview")}
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1  gap-5">
        <Select
          name={"client"}
          control={control}
          label="Select Client"
          selectItems={[
            { value: "one", label: "one" },
            { value: "two", label: "two" },
            { value: "three", label: "three" },
          ]}
          onChange={(value) => setValue("client", value)}
        />
        <Input
          containerClassName="flex flex-col flex-1 w-full gap-2 "
          labelClassName="text-sm font-bold"
          label="Project Budget"
          placeholder="$1000"
          type="number"
          {...register("budget")}
        />
      </div>
      <div className="w-full flex-1 flex justify-between items-center ">
        <Button type="submit" size="lg">
          Create Project
        </Button>
        <Button type="button" size="lg" variant="destructive">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
