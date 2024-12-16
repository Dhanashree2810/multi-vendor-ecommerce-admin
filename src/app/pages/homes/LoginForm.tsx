'use client'
import React, { useState, useEffect, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';


export function LoginForm() {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginSuccess] = useState(false);
    const [errors, setErrors] = useState({ emailId: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (emailId && password) {
            setLoading(true);
            // try {
            //     const data = await loginUser({ emailId, pin: password });

            //     if (data && data.token) {
            //         localStorage.setItem('token', data.token);
            //         setIsLoginSuccess(true);
            //     } else {
            //         setIsLoginSuccess(false);
            //         alert('Login failed. Please check your credentials.');
            //     }
            // } catch (error) {
            //     console.error('Error during login:', error);
            //     setIsLoginSuccess(false);
            //     alert('An error occurred during login.');
            // } finally {
            //     setLoading(false);
            // }
        } else {
            setErrors({
                emailId: emailId ? '' : 'Email is required',
                password: password ? '' : 'Password is required',
            });
        }
    };

    if (!isClient) {
        return null;
    }
    return (
        <div
            className="flex items-center justify-center w-full h-screen bg-[#CDCAE9]"          
        >
            <div className="w-full max-w-sm bg-[#6F68D1] p-2 rounded-lg shadow-lg">
                <Card className=' border-none bg-[#6F68D1]'>
                    <CardHeader className=' text-white'>
                        <CardTitle className="text-center font-bold text-2xl">Admin Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} noValidate className="space-y-4 text-white">
                            <div className="form-group mb-6">
                                <Label htmlFor="emailId" className='font-bold'>Email Address</Label>
                                <Input
                                    type="text"
                                    id="emailId"
                                    name="emailId"
                                    placeholder="Email"
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                    className="form-control mt-3 text-white"
                                    required
                                />
                                {errors.emailId && <p className="text-red-600 text-xs">{errors.emailId}</p>}
                            </div>
                            <div className="form-group mb-3">
                                <Label htmlFor="password" className='font-bold'>Password *</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control mt-3"
                                    required
                                />
                                {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
                            </div>

                            <div className="btnContainer">
                                {isLoginSuccess ? (
                                    <Link href="/admin/dashboard">
                                        <Button className="w-full bg-[#1E293B] text-white py-2 rounded-lg font-bold">
                                            Login
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button type="submit" className="w-full bg-[#1E293B] text-white py-2 rounded-lg font-bold" disabled={loading}>
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
