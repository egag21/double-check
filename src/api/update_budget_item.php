// file: update_budget_item.php
<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare('UPDATE budget_items SET name = ?, amount = ?, type = ?, notes = ? WHERE id = ?');
$stmt->execute([$data['name'], $data['amount'], $data['type'], $data['notes'], $data['id']]);

echo json_encode($data);
?>
