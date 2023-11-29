<template>
	<div class="TypographyHeading typography-system">
		<div class="typography-system__row">
			<div class="typography-system__column">
				<h1>Heading h1</h1>
				<h2>Heading h2</h2>
				<h3>Heading h3</h3>
				<h4>Heading h4</h4>
				<h5>Heading h5</h5>
				<h6>Heading h6</h6>
			</div>
			<div class="typography-system__column">
				<div class="is--h1__title">Heading h1 by is--h1__title class</div>
				<div class="is--h2__title">Heading h2 by is--h2__title class</div>
				<div class="is--h3__title">Heading h3 by is--h3__title class</div>
				<div class="is--h4__title">Heading h4 by is--h4__title class</div>
				<div class="is--h5__title">Heading h5 by is--h5__title class</div>
				<div class="is--h6__title">Heading h6 by is--h6__title class</div>
			</div>
		</div>
		<br>
		<br>
		<header>
			<h1>Heading h1 with Subtitle</h1>
			<h3 class="is--subheading">
				Important lessongs learned from building 10 products on my own in 2 years
			</h3>
		</header>
		<br>
		<header>
			<h1>Heading h2 with h4 Subtitle</h1>
			<h4 class="is--subheading">
				Important lessongs learned from building 10 products on my own in 2 years
			</h4>
		</header>
		<br>
		<h3>Paragraph</h3>
		<p>This is paragraph. There are those who believe that life here began out there... far across the universe,
			with tribes of humans who may have been the forefathers of the Egyptians or the Toltecs or the Mayans.
			Some believe that there may yet be brothers of man who even now fight to survive somewhere beyond the
			heavens. Fleeing from the Cylon Tyranny, the last Battlestar - Galactica - leads a rag-tag fugitive
			fleet on a lonely quest. A shining planet, known as Earth.
		</p>
		<br>
		<h3>Small text, class: is--small-text</h3>
		<p class="is--small-text">This is paragraph. There are those who believe that life here began out there... far across the universe,
			with tribes of humans who may have been the forefathers of the Egyptians or the Toltecs or the Mayans.
			Some believe that there may yet be brothers of man who even now fight to survive somewhere beyond the
			heavens. Fleeing from the Cylon Tyranny, the last Battlestar - Galactica - leads a rag-tag fugitive
			fleet on a lonely quest. A shining planet, known as Earth.
		</p>
		<br>
		<h3>EM/Strong</h3>
		<em>There are those who believe that life here began out there...</em>
		<br>
		<strong>There are those who believe that life here began out there...</strong>
	</div>
</template>

<style lang="sass" scoped>
@import '@/styles/_fonts.sass'
.typography-system
	width: 100%
	&__row
		display: flex
		flex-direction: row
		width: 100%
	&__column
		width: 50%
</style>
