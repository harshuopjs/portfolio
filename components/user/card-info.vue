<template>
	<div class="mb-3">
		<h2 class="mb-2 text-xs font-bold uppercase leading-4 text-zinc-700 dark:text-slate-300">About Me</h2>

		<!-- userInfoBody -->
		<section role="list">
			<div role="listitem">
				<external-link href="https://pronouns.org/he-him">He/Him</external-link>
				{{ ' ·' }}
				<external-link href="https://www.16personalities.com/infp-personality">INFP-T</external-link>
				{{ ' · 18+' }}
			</div>

			<div role="listitem">
				<external-link href="https://x.com/real_harshuopjs">@real_harshuopjs</external-link>
				{{ ' · Banner: ' }}
				<external-link href="https://instagram.com/engi.harsh">engi.harsh</external-link>
			</div>

			<div class="mt-5" role="listitem">
				<IconsSmallBlueDiamond draggable="false" aria-hidden="true" />
				{{ 'I am a passionate and dedicated web developer with a strong foundation in HTML,CSS,JS,vue,JAVA,Python. ' }}
			
				<external-link class="pl-1" href="https://github.com/harshuopjs"> Harshuopjs- Github</external-link>{{ "'s Project's" }}
			</div>

			<div role="listitem">
				<IconsSmallBlueDiamond draggable="false" aria-hidden="true" />
				<external-link class="pl-1" href="https://github.com/harshuopjs/basic.utils-package"> package basic.util </external-link>{{ 'developer' }}
			</div>

			<div role="listitem">
				<IconsSmallBlueDiamond draggable="false" aria-hidden="true" />
				<external-link class="pl-1" href="https://github.com/harshuopjs/bank-management-system">Bank-Management System</external-link>{{ "'s Lead Programmer" }}
			</div>
		</section>
	</div>
</template>
