<template>
	<div class="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
		<div class="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
			<h1 class="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl dark:text-gray-100">Harsh Kumar Singh</h1>
			<p class="mb-8 leading-relaxed">
				Software Engineer &amp; Web Developer. I love to create and learn new things. I'm passionate about technology and programming.
			</p>
			<div class="flex gap-2">
				<button-link href="https://github.com/harshuopjs" text="GitHub" />
				<button-link href="https://twitter.com/real_harshuopjs" text="Twitter" />
				<button-link href="https://instagram.com/engi.harsh" text="Instagram" />
			</div>
		</div>

		<user-card />
	</div>
</template>

<script setup lang="ts">
defineSeo({ title: 'Harsh Kumar Singh', description: "Harsh Kumar's personal website and portfolio." });
</script>
