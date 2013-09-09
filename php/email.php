<?php

	//delcare variables passed from AJAX
	$contact = $_POST['con_name'];
	$contact_email = $_POST['con_email'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
	
	if(!$contact || !$contact_email || !$subject || !$message){
		return false;
		die();
	}
	
	//declare email variables
	$to = 'callisonification@gmail.com';
	$sub = $subject;
	
	//create HTML message
	$mssg = '
		<html>
			<head>'.$subject.'</head>
			<body>
				<br />
				<p>You have a new message from: '.$contact.'.</p>
				<p>You may reply to this person at: '.$contact_email.'</p>
				<br />
				<p>===== Beginning of message =====</p>
				<br />
				<p>'.$message.'</p>
				<br />
				<p>===== End of message =====</p>
			</body>
		</html>
	';
	
	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	
	// Additional headers
	$headers .= 'From: '.$contact_email."\r\n";
	
	//send function
	mail($to, $sub, $mssg, $headers);
	
	//return true
	return true;