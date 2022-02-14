<template>
  <section class="text-coolGray-100 flex h-full items-center p-16">
    <div
      class="container mx-auto my-8 flex flex-col items-center justify-center px-5"
    >
      <div class="max-w-lx text-center">
        <h2 class="dark:text-coolGray-600 mb-8 text-9xl font-extrabold">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">
          Desculpe, não foi possível encontrar esta página..
        </p>
        <p class="dark:text-coolGray-400 mt-4 mb-16">
          Mas não se preocupe, você pode encontrar muitas outras coisas em nossa página inicial.
        </p>
        <router-link
          to="/"
          class="rounded bg-pink px-8 py-3 font-semibold text-white"
        >
          Voltar Para a Pagina Inicial
        </router-link>
      </div>
    </div>
  </section>
</template>
