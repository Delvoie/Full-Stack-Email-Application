<?php
namespace Application;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Verifier
{
    private const SECRET = '6O]s77VY^MO@61mQNW%M%zfsy=nQ{bp5]$Ll\'A|';

    // Ai debugging suggested :array and lines 29 to 32 to fix null array error
    public function decode($jwt): ?array
    {
        if (empty($jwt)) {
            return null;
        }

        // Trim whitespace from token string.
        $jwt = trim($jwt);

        // Remove the 'Bearer' prefix, if present
        if (str_starts_with($jwt, 'Bearer ')) {
            $jwt = substr($jwt, 7);
        }

        // Attempt to decode the token:
        try {
            $token = JWT::decode($jwt, new Key(self::SECRET, 'HS256'));

            return [
                'userId' => $token->userId,
                'role' => $token->role
            ];
        } catch (\Throwable $e) {
            return null;
        }
    }
}