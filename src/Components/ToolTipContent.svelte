<!-- ToolTipContent.svelte -->
<!--
  This component declares the HTML content for the tooltip for its parent element.

  @component ToolTipContent
  @description Declare the HTML content for the parent tooltip here.
-->

<div class="tooltip-content" aria-hidden="true">
    <slot/>
</div>

<style lang="scss">
	/* This content will always be hidden as it just 
       defines the content of its parent elements TT */
	.tooltip-content {
		display: none;
	}
</style>