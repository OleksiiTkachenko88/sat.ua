<ol>
<?
foreach (glob("*.html") as $filename)
{
?>
	<li>
		<a target="_blank" href="/local/markup/dist_26-12-2016/<?=$filename?>"><?=$filename?></a>
		<br/>
	</li>
<?
}
?>
</ol>