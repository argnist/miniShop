<?php
/**
 * Get a list of History
 *
 * @package minishop
 * @subpackage processors
 */

if (!$modx->hasPermission('view')) {return $modx->error->failure($modx->lexicon('ms.no_permission'));}

$isLimit = !empty($_REQUEST['limit']);
$start = $modx->getOption('start',$_REQUEST,0);
$limit = $modx->getOption('limit',$_REQUEST,round($modx->getOption('default_per_page') / 2));
$sort = $modx->getOption('sort',$_REQUEST,'id');
$dir = $modx->getOption('dir',$_REQUEST,'DESC');
$oid = $modx->getOption('oid', $_REQUEST, 0);
$type = $modx->getOption('type', $_REQUEST, 0);
$operation = $modx->getOption('operation', $_REQUEST, 0);

$c = $modx->newQuery('ModLog');
$c->where(array('oid' => $oid));
if (!empty($type)) {
	$c->andCondition(array('type' => $type));
}
if (!empty($operation)) {
	$c->andCondition(array('operation' => $operation));
}

$count = $modx->getCount('ModLog',$c);

$c->sortby($sort,$dir);
if ($isLimit) $c->limit($limit, $start);
$logs = $modx->getCollection('ModLog',$c);

$arr = array();
foreach ($logs as $v) {
    $tmp = $v->toArray();
	$tmp['username'] = $v->getUserName();
	$tmp['type'] = $modx->lexicon('ms.'.$tmp['type']);
	$tmp['name'] = $v->getName();
	$arr[]= $tmp;
}
return $this->outputArray($arr, $count);
