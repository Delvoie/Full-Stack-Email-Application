<?php
require  __DIR__ . '/../../../autoload.php';

use Application\Mail;
use Application\Database;
use Application\Page;
use Application\Verifier;

$database = new Database('prod');
$page = new Page();
$verifier = new Verifier();

//Utilized AI to fix (array offset on null) error
//Ai add line 15-19 for null coalescing and error handling
$decoded = $verifier->decode($_SERVER['HTTP_AUTHORIZATION'] ?? null);
if (!$decoded) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$mail = new Mail($database->getDb(), $decoded['userId'], $decoded['role']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (array_key_exists('name', $data) && array_key_exists('message', $data)) {
        $id = $mail->createMail($data['name'], $data['message']);
        $page->item(array("id" => $id));
    } else {
        $page->badRequest();
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $page->item($mail->listMail());
} else {
    $page->badRequest();
}