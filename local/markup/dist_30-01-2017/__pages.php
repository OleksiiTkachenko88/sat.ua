<ol>
<?
foreach (glob("*.html") as $filename)
{
?>
	<li>
		<a target="_blank" href="/local/markup/dist_30-01-2017/<?=$filename?>"><?=$filename?></a>
		<br/>
	</li>
<?
}
?>
</ol>