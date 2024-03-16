"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useState } from "react";

async function postData(formData: any) {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbyioAU4dEbsgWH5SWPEN8e3OuF5ttT9ChWbSJdM8_XKqePMPuXg-9--GIL1PRKL60s7MQ/exec",
    {
      method: "POST",
      redirect: "follow",

      body: formData,
    }
  );
  const response = await res.json();
  if (response) {
    window.location.reload();
  }
}

export function ProfileForm() {
  const [loading, setLoading] = useState(false);
  // 2. Define a submit handler.
  function onSubmit(e: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("surname", e.target.surname.value);
    formData.append("email", e.target.email.value);

    postData(formData).finally(() => {
      setLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 w-[100%] flex flex-col">
      <label>
        Name <Input placeholder="shadcn" name="name" />
      </label>

      <label>
        Surname <Input placeholder="shadcn" name="surname" />
      </label>

      <label>
        Email <Input placeholder="shadcn" name="email" />
      </label>

      <Button type="submit">{loading ? "..." : "Enviar"}</Button>
    </form>
  );
}
