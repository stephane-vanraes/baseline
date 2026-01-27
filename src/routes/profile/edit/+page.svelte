<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import DateInput from '$lib/components/forms/DateInput.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import SelectInput from '$lib/components/forms/SelectInput.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { updateProfile } from '$lib/db';

	const { data } = $props();

	const saveProfile: SubmitFunction = async ({ formData, cancel }) => {
		cancel();

		const asInt = (k: string) => parseInt(formData.get(k)?.toString() ?? '0');
		const asString = (k: string) => formData.get(k)?.toString() ?? '';

		await updateProfile({
			name: asString('name'),
			dob: asString('dob'),
			height: asInt('height'),
			sex: asString('sex') as 'male' | 'female',
			currentWaist: asInt('currentWaist'),
			currentWeight: asInt('currentWeight'),
			initialWaist: data.profile?.initialWaist ? data.profile.initialWaist : asInt('currentWaist'),
			initialWeight: data.profile?.initialWeight
				? data.profile.initialWeight
				: asInt('currentWeight')
		});

		goto(resolve('/profile'));
	};
</script>

<h1>New Profile</h1>

<form method="POST" use:enhance={saveProfile}>
	<TextInput label="Name" name="name" value={data.profile?.name} />
	<DateInput label="Date of Birth" name="dob" value={data.profile?.dob} />
	<SelectInput
		label="Sex"
		name="sex"
		value={data.profile?.sex ?? 'male'}
		options={[
			{ value: 'male', label: 'Male' },
			{ value: 'female', label: 'Female' }
		]}
	/>
	<NumberInput label="Height" name="height" value={data.profile?.height ?? 170} unit="cm" />
	<NumberInput
		label="Weight"
		name="currentWeight"
		value={data.profile?.currentWeight ?? 80}
		unit="kg"
	/>
	<NumberInput
		label="Waist"
		name="currentWaist"
		value={data.profile?.currentWaist ?? 90}
		unit="cm"
	/>
	<button type="submit">Save</button>
</form>

<style>
	form {
		display: grid;
		gap: 1rem;
	}
	button {
		justify-self: end;
	}
</style>
