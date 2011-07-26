<?php 
function validateEmail($email)
{  
	return ereg("^[a-zA-Z0-9]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$", $email);  
}

if($_POST) {

error_reporting(0);
//Create an ERROR array
$errors = array();

//Get form inputs
	if (!$_POST['name'])
		$errors[] = "Name is required.";
	if (!$_POST['email-address'])
		$errors[] = "An email is required.";
	if (!validateEmail($_POST['email-address']))
		$errors[] = "Please use a valid email address.";
	if (!$_POST['phone'])
		$errors[] = "A phone number is required.";
	if ($_POST['comments'] == '')
		$errors[] = "Please let us know what you are looking for.";

	//If there are ERRORS
	if(count($errors) > 0) {
	print_r($errors);
	
	} else {
	//If there are no ERRORS
	//Collect variable data
	$subject = "creative|switch Contact Form";
	$to = "joelfoy@gmail.com";
	$name = $_POST['name'];
	$email = $_POST['email-address'];
	$phone = $_POST['phone'];
	$comments = $_POST['comments'];
	
	//Build Contact Form to Chris Bryan
	$message = "Name: $name\n\n";
	$message .= "Email Address: $email\n\n";
	$message .= "Phone: $phone\n\n";
	$message .= "Comments: \n\n $comments";
	
	//Build Confirm Email
	$replyTo = $email;
	$replySubject = "Contacting creative|switch";
	$extra = "From: Joel Foy <jfoy@createswitch.com>\r\n";
	$extra .= "Content-Type: text/html\n";
	
	//Build Confirmation Email Message
	$replyMessage = "<html>";
	$replyMessage .= "<body>";
	$replyMessage .= "<table cellspacing='0' cellpadding='0' width='650' style='font-family:sans-serif;'>";
	$replyMessage .= "<tr>";
	$replyMessage .= "<td>";
	$replyMessage .= "<table cellpadding='0' cellspacing='0' width='650'>";
	$replyMessage .= "<tr style='background-color:#dedede; padding-top:5px;'>";
	$replyMessage .= "<td style='padding:10px 0 10px 20px' width='100'><img src='http://www.createswitch.com/images/logo-small.png' /></td>";
	$replyMessage .= "<td style='font-family:sans-serif; font-weight:bold; font-size:22px; color:#444;  padding:5px 0 0 10px;' valign='middle'>Contact Form</td>";
	$replyMessage .= "</tr></table></td></tr><tr>";
	$replyMessage .= "<table cellpadding='0' cellspacing='0' width='650' style='font-family:sans-serif;' >";
	$replyMessage .= "<tr style=''>";
	$replyMessage .= "<td style='padding:25px 0 20px 20px; font-size:24px;'><strong>Thanks</strong> $name!</td>";
	$replyMessage .= "</tr><tr><td style='padding:0 0 20px 20px'>";
	$replyMessage .= "<p style='line-height:20px;'>Thank you for contacting creative|switch. Your time is important and we know that. You will be contacted soon. </p>";
	$replyMessage .= "<p style='line-height:20px;'>Please feel free to call Joel Foy at 678-591-7266 if you would like to speak with me immediately.</p>";
	$replyMessage .= "</td></tr><tr>";
	$replyMessage .= "<p style='font-size:20px;'>Thank you</p>";
	$replyMessage .= "</td></tr></table></tr><tr><td>";
	$replyMessage .= "<table cellpadding='0' cellspacing='0' width='650'>";
	$replyMessage .= "<tr style='background-color:#dedede; padding-top:5px;'>";
	$replyMessage .= "<td style='font-family:sans-serif; font-size:11px; color:#444;  padding:5px 0 5px 10px;' valign='middle'>&copy; creative|switch 15 Renwick Dr. Senoia, Georgia 30276</td>";
	$replyMessage .= "</tr></table></td></tr></table>";
	$replyMessage .= "</body>";
	$replyMessage .= "</html>";
	
	
		//Send Confirm Message First
		$confirmMessage = mail($replyTo, $replySubject, $replyMessage, $extra);
		
		if($confirmMessage) {
		//Send Primary Message
		$mailSent = mail($to, $subject, $message);
		} 
		
		//Return To Contact Page
		if($mailSent) {
		print "<meta http-equiv=\"refresh\" content=\"0;URL=http://www.createswitch.com/#contact?signup=complete\">";
		}
	 
	}

} else {
//You do not have access
print "<meta http-equiv=\"refresh\" content=\"0;URL=http://christopherbryancpa.com/#contact?signup=invalid\">";

}//end form


?>