<?php
	header("Content-type:text/html;charset=utf-8");
	require_once 'setting.php';
	require_db();
	echo $mydb->__get("is_use_mysqli");
	//$mydb->add_line("高新线");
	//$mydb->add_group("1号杆塔", "圣惠路", "高新线");
	//$mydb->add_dev("0912345688", "测试设备", "A相", "1号杆塔", "圣惠路", "高新线");
	$mydb->get_dev_info("0912345678");
	echo "<pre>";
	print_r($mydb->get_dev_info("0912345678"));
	
	print_r($mydb->__get('col_info'));
	echo "</pre>";
?>