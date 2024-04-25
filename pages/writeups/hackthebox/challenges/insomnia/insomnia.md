---
layout: post
author: k0d14k
title: HackTheBox - Insomnia (web)
---

---

Tags: `JSON Password Bypass`

---

> Welcome back to Insomnia Factory, where you might have to work under the enchanting glow of the moon, crafting dreams and weaving sleepless tales.
> 

In this web challenge provided by Hack the Box, We have a register/login form.

![Untitled](Untitled.png)

The starting page doesn’t give us any information so We could take a look at the source code provided with the challenge.

```php
<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Paths;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ProfileController extends BaseController
{
    public function index()
    {
        $token = (string) $_COOKIE["token"] ?? null;
        $flag = file_get_contents(APPPATH . "/../flag.txt");
        if (isset($token)) {
            $key = (string) getenv("JWT_SECRET");
            $jwt_decode = JWT::decode($token, new Key($key, "HS256"));
            $username = $jwt_decode->username;
            if ($username == "administrator") {
                return view("ProfilePage", [
                    "username" => $username,
                    "content" => $flag,
                ]);
            } else {
                $content = "Haven't seen you for a while";
                return view("ProfilePage", [
                    "username" => $username,
                    "content" => $content,
                ]);
            }
        }
    }
}

```

Reading the code We got the `ProfileController` class. In this class, We noticed that to get the flag, We have to log in as `administrator`.

Let’s take a look at the login functionality to see if there is a security issue in the login implementation. Spoiler, it is.

```php
public function login()
    {
        $db = db_connect();
        $json_data = request()->getJSON(true);
        if (!count($json_data) == 2) {
            return $this->respond("Please provide username and password", 404);
        }
        **$query = $db->table("users")->getWhere($js**on_data, 1, 0);
        $result = $query->getRowArray();
        if (!$result) {
            return $this->respond("User not found", 404);
        } else {
            $key = (string) getenv("JWT_SECRET");
            $iat = time();
            $exp = $iat + 36000;
            $headers = [
                "alg" => "HS256",
                "typ" => "JWT",
            ];
            $payload = [
                "iat" => $iat,
                "exp" => $exp,
                "username" => $result["username"],
            ];
            $token = JWT::encode($payload, $key, "HS256");

            $response = [
                "message" => "Login Succesful",
                "token" => $token,
            ];
            return $this->respond($response, 200);
        }
    }
```

Reading the code, We notice that once the username is provided, se server just asserts that a user with that username exists. But it’s not checking the password.

![Untitled](Untitled%201.png)

There We go, now We have a valid cookie for the admin. Let’s use it to get the profile.

![Untitled](Untitled%202.png)

---

## Flag: HTB{I_just_want_to_sleep_a_little_bit!!!!!}