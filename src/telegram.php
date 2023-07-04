<?php
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$description = $_POST['user_description'];
$token = "5147511306:AAGct4vGbYWOla9YTOY3ayGlIEAiT3dnRcQ";
$chat_id = "-787566705";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Комментарий к заказу: ' => $description,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

// if ($sendToTelegram) {
//   pass
// } else {
//   echo "Произошла ошибка";
// }
?>

