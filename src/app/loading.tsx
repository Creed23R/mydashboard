'use client'
import React from 'react'
import { CircularProgress } from "@nextui-org/react";

const loading = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <CircularProgress size="lg" aria-label="Loading..." />
    </section>
  )
}

export default loading