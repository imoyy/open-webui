<script lang="ts">
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';

	import {
		WEBUI_NAME,
		chatId,
		mobile,
		settings,
		showArchivedChats,
		showControls,
		showSidebar,
		temporaryChatEnabled,
		user
	} from '$lib/stores';

	import { slide } from 'svelte/transition';
	import ShareChatModal from '../chat/ShareChatModal.svelte';
	import ModelSelector from '../chat/ModelSelector.svelte';
	import Tooltip from '../common/Tooltip.svelte';
	import Menu from './Navbar/Menu.svelte';
	import { page } from '$app/stores';
	import UserMenu from './Sidebar/UserMenu.svelte';
	import MenuLines from '../icons/MenuLines.svelte';
	import AdjustmentsHorizontal from '../icons/AdjustmentsHorizontal.svelte';
	import Map from '../icons/Map.svelte';
	import { stringify } from 'postcss';
	import PencilSquare from '../icons/PencilSquare.svelte';
	import Plus from '../icons/Plus.svelte';

	const i18n = getContext('i18n');

	export let initNewChat: Function;
	export let title: string = $WEBUI_NAME;
	export let shareEnabled: boolean = false;

	export let chat;
	export let selectedModels;
	export let showModelSelector = true;

	let showShareChatModal = false;
	let showDownloadChatModal = false;
</script>

<ShareChatModal bind:show={showShareChatModal} chatId={$chatId} />

<div class="sticky bg-white dark:bg-dark-800 sm:dark:bg-dark-700 top-0 z-30 w-full px-1.5 py-2 -mb-8 flex items-center">
	<div
		class=" bg-linear-to-b via-50% from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent pointer-events-none absolute inset-0 -bottom-7 z-[-1]"
	></div>

	<div class=" flex max-w-full w-full mx-auto px-1 pt-0.5 bg-transparent">
		<div class="flex items-center w-full max-w-full">
			<div
				class="{$showSidebar
					? 'md:hidden'
					: ''} mr-2 self-start flex flex-none items-center text-gray-600 dark:text-gray-400"
			>
				<button
					id="sidebar-toggle-button"
					class="cursor-pointer px-2 py-2 flex rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition"
					on:click={() => {
						showSidebar.set(!$showSidebar);
					}}
					aria-label="Toggle Sidebar"
				>
					<div class=" m-auto self-center">
						<MenuLines />
					</div>
				</button>
			</div>

			<div
				class="flex-1 overflow-hidden max-w-full py-0.5
			{$showSidebar ? 'ml-1' : ''}
			"
			>
				{#if showModelSelector}
					<ModelSelector bind:selectedModels showSetDefault={!shareEnabled} />
				{/if}
			</div>

			<div class="self-start flex flex-none items-center gap-1 text-gray-600 dark:text-gray-400">
				<!-- <div class="md:hidden flex self-center w-[1px] h-5 mx-2 bg-gray-300 dark:bg-stone-700" /> -->
				{#if shareEnabled && chat && (chat.id || $temporaryChatEnabled)}
					<Menu
						{chat}
						{shareEnabled}
						shareHandler={() => {
							showShareChatModal = !showShareChatModal;
						}}
						downloadHandler={() => {
							showDownloadChatModal = !showDownloadChatModal;
						}}
					>
						<button
							class="flex cursor-pointer px-2 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition"
							id="chat-context-menu-button"
						>
							<div class=" m-auto self-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="size-5"
								>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9684 14.0022C11.1062 14.537 10.7843 15.0823 10.2495 15.22C7.46676 15.9369 5.5 18.2894 5.5 20.9999C5.5 21.5522 5.05228 21.9999 4.5 21.9999C3.94772 21.9999 3.5 21.5522 3.5 20.9999C3.5 17.2714 6.1909 14.2002 9.75054 13.2833C10.2854 13.1455 10.8306 13.4674 10.9684 14.0022Z" fill="currentColor"></path><path d="M17.25 15.625C17.25 16.5225 16.5225 17.25 15.625 17.25C14.7275 17.25 14 16.5225 14 15.625C14 14.7275 14.7275 14 15.625 14C16.5225 14 17.25 14.7275 17.25 15.625Z" fill="currentColor"></path><path d="M21.75 15.625C21.75 16.5225 21.0225 17.25 20.125 17.25C19.2275 17.25 18.5 16.5225 18.5 15.625C18.5 14.7275 19.2275 14 20.125 14C21.0225 14 21.75 14.7275 21.75 15.625Z" fill="currentColor"></path><path d="M21.75 20.125C21.75 21.0225 21.0225 21.75 20.125 21.75C19.2275 21.75 18.5 21.0225 18.5 20.125C18.5 19.2275 19.2275 18.5 20.125 18.5C21.0225 18.5 21.75 19.2275 21.75 20.125Z" fill="currentColor"></path><path d="M17.25 20.125C17.25 21.0225 16.5225 21.75 15.625 21.75C14.7275 21.75 14 21.0225 14 20.125C14 19.2275 14.7275 18.5 15.625 18.5C16.5225 18.5 17.25 19.2275 17.25 20.125Z" fill="currentColor">
									</path>
								</svg>
							</div>
						</button>
					</Menu>
				{:else if $mobile}
					<Tooltip content={$i18n.t('Controls')}>
						<button
							class=" flex cursor-pointer px-2 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition"
							on:click={async () => {
								await showControls.set(!$showControls);
							}}
							aria-label="Controls"
						>
							<div class=" m-auto self-center">
								<AdjustmentsHorizontal className=" size-5" strokeWidth="0.5" />
							</div>
						</button>
					</Tooltip>
				{/if}

				{#if !$mobile}
					<Tooltip content={$i18n.t('Controls')}>
						<button
							class=" flex cursor-pointer px-2 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition"
							on:click={async () => {
								await showControls.set(!$showControls);
							}}
							aria-label="Controls"
						>
							<div class=" m-auto self-center">
								<AdjustmentsHorizontal className=" size-5" strokeWidth="0.5" />
							</div>
						</button>
					</Tooltip>
				{/if}

				<Tooltip content={$i18n.t('New Chat')}>
					<button
						id="new-chat-button"
						class=" flex {$showSidebar
							? 'md:hidden'
							: ''} cursor-pointer px-2 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850 transition"
						on:click={() => {
							initNewChat();
						}}
						aria-label="New Chat"
					>
						<div class=" m-auto self-center">
							<PencilSquare className=" size-5" strokeWidth="2" />
						</div>
					</button>
				</Tooltip>

				{#if $user !== undefined}
					<UserMenu
						className="max-w-[200px]"
						role={$user.role}
						on:show={(e) => {
							if (e.detail === 'archived-chat') {
								showArchivedChats.set(true);
							}
						}}
					>
						<button
							class="select-none flex rounded-xl p-1.5 w-full hover:bg-gray-50 dark:hover:bg-gray-850 transition"
							aria-label="User Menu"
						>
							<div class=" self-center">
								<img
									src={$user.profile_image_url}
									class="size-6 object-cover rounded-full"
									alt="User profile"
									draggable="false"
								/>
							</div>
						</button>
					</UserMenu>
				{/if}
			</div>
		</div>
	</div>
</div>
