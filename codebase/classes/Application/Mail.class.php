<?php
namespace Application;

use PDO;

class Mail
{
    protected $db;
    protected $userId;
    protected $role;

    public function __construct($db, $userId = null, $role = null) {
        $this->db = $db;
        $this->userId = $userId;
        $this->role = $role;
    }

    public function createMail($name, $message)
    {
        $stmt = $this->db->prepare("INSERT INTO mail (name, message, userId) VALUES (:name, :message, :userId)");
        $stmt->execute(['name' => $name, 'message' => $message, 'userId' => $this->userId]);

        return $this->db->lastInsertId();
    }

    public function listMail()
    {
        if ($this->role === 'admin') {
            // Admins Roles
            $result = $this->db->query("SELECT id, name, message, userId FROM mail ORDER BY id");
        } else {
            // Users only see their own mail
            $stmt = $this->db->prepare("SELECT id, name, message, userId FROM mail WHERE userId = :userId ORDER BY id");
            $stmt->execute(['userId' => $this->userId]);
            $result = $stmt;
        }

        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
}