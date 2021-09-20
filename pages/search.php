<?php

$projectId = helper_get_current_project();

layout_page_header("Chercher des tickets");
layout_page_begin();
?>
<h1>Chercher des tickets</h1>

<div id="search-container" <?= $projectId > 0 ? "data-project-id=\"$projectId\"" : "" ?></div>
<?php
layout_page_end();
