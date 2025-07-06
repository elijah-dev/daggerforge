"use client";

import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  adversaryAttackRangesEnum,
  adversaryDamageDiceEnum,
  adversaryDamageTypesEnum,
  adversarySchema,
  adversaryTiersEnum,
  adversaryTypesEnum,
} from "@/zod/adversary";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "./text-field";
import { NumberField } from "./number-field";
import { TextAreaField } from "./text-area-field";
import { SelectField } from "./select-field";
import { cn } from "@/lib/utils";
import { TagSelectField } from "./tag-select-field";
import { ExperienceSelectField } from "./experience-select-field";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const tierOptions = adversaryTiersEnum.options.map((tier) => ({
  value: tier,
  label: `Tier ${tier}`,
}));

const typeOptions = adversaryTypesEnum.options.map((type) => ({
  value: type,
  label: type.charAt(0).toUpperCase() + type.slice(1),
}));

const attackRangeOptions = adversaryAttackRangesEnum.options.map((range) => ({
  value: range,
  label: range.charAt(0).toUpperCase() + range.slice(1),
}));

const damageTypeOptions = adversaryDamageTypesEnum.options.map((type) => ({
  value: type,
  label: type.charAt(0).toUpperCase() + type.slice(1),
}));

const damageDieOptions = adversaryDamageDiceEnum.options.map((die) => ({
  value: die,
  label: `d${die}`,
}));

export const AdversaryForm = () => {
  const form = useForm({
    resolver: zodResolver(adversarySchema),
    defaultValues: {
      name: "",
      tier: adversaryTiersEnum.Enum["1"],
      type: adversaryTypesEnum.Enum.standard,
      creaturesPerHp: 0,
      description: "",
      difficulty: 0,
      majorThreshold: 0,
      severeThreshold: 0,
      hp: 1,
      stress: 1,
      attackModifier: 0,
      attackName: "",
      attackRange: adversaryAttackRangesEnum.Enum.melee,
      attackDamageDieCount: 1,
      attackDamageDie: adversaryDamageDiceEnum.Enum["6"],
      attackDamageModifier: 0,
      attackDamageType: adversaryDamageTypesEnum.Enum.physical,
      motivesAndTactics: [],
      experiences: [],
      public: false,
    },
  });

  const trpc = useTRPC();
  const { mutate } = useMutation({
    ...trpc.adversaries.create.mutationOptions(),
    onSuccess: (...args) => {
      form.reset();
      console.log("Adversary created successfully:", ...args);
    },
  });

  const onSubmit = (data: z.infer<typeof adversarySchema>) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <h2 className="text-muted-foreground mb-4">General</h2>
        <div className="flex gap-4">
          <SelectField
            control={form.control}
            name="tier"
            label="Tier"
            options={tierOptions}
            className="w-full"
            triggerClassName="w-full"
          />
          <SelectField
            control={form.control}
            name="type"
            label="Type"
            options={typeOptions}
            className="w-full"
            triggerClassName="w-full"
          />
          <NumberField
            control={form.control}
            name="creaturesPerHp"
            label="Creatures per HP"
            className={cn(
              "w-full",
              form.watch("type") === adversaryTypesEnum.Values.horde
                ? ""
                : "hidden"
            )}
          />
        </div>
        <TextField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Acid Burrower"
        />
        <TextAreaField
          control={form.control}
          name="description"
          label="Description"
          textareaClassName="resize-none"
          placeholder="A horse-sized insect with digging claws and acidic blood."
        />
        <h2 className="text-muted-foreground mb-4">Stats</h2>
        <div className="flex gap-4">
          <NumberField
            control={form.control}
            name="hp"
            label="HP"
            min={1}
            max={20}
            className="w-full"
          />
          <NumberField
            control={form.control}
            name="stress"
            label="Stress"
            min={1}
            max={20}
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <NumberField
            control={form.control}
            name="difficulty"
            label="Difficulty"
            min={0}
            className="w-full"
          />
          <NumberField
            control={form.control}
            name="majorThreshold"
            label="Major Treshold"
            min={0}
            className="w-full"
          />
          <NumberField
            control={form.control}
            name="severeThreshold"
            label="Severe Treshold"
            min={0}
            className="w-full"
          />
        </div>
        <h2 className="text-muted-foreground mb-4">Attack</h2>
        <TextField
          control={form.control}
          name="attackName"
          label="Attack Name"
          placeholder="Claws"
        />
        <div className="flex gap-4">
          <NumberField
            control={form.control}
            name="attackModifier"
            label="Attack Modifier"
            className="w-full"
          />
          <SelectField
            control={form.control}
            name="attackRange"
            label="Attack Range"
            options={attackRangeOptions}
            className="w-full"
            triggerClassName="w-full"
          />
          <SelectField
            control={form.control}
            name="attackDamageType"
            label="Damage Type"
            options={damageTypeOptions}
            className="w-full"
            triggerClassName="w-full"
          />
        </div>
        <div className="flex gap-4 w-full">
          <NumberField
            control={form.control}
            name="attackDamageDieCount"
            label="Number of Dice"
            min={1}
            className="w-full"
          />
          <SelectField
            control={form.control}
            name="attackDamageDie"
            label="Damage Die"
            options={damageDieOptions}
            className="w-full"
            triggerClassName="w-full"
          />
          <NumberField
            control={form.control}
            name="attackDamageModifier"
            label="Damage Modifier"
            className="w-full"
          />
        </div>
        <h2 className="text-muted-foreground mb-4">Behavior</h2>
        <TagSelectField
          control={form.control}
          name="motivesAndTactics"
          label="Motives and Tactics"
          placeholder="Burrow"
          max={6}
        />
        <ExperienceSelectField
          control={form.control}
          name="experiences"
          label="Experiences"
          placeholder="Tremor Sense"
          max={6}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
