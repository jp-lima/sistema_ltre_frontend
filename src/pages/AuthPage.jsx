import { FunctionSquare, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function FeatureCard({ icon: Icon, label }) {
  return (
    <div
      className={cn(
        "flex h-[160px] flex-1 flex-col justify-center gap-3 rounded-xl border border-border bg-card p-6 shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
      )}
    >
      <Icon className="h-8 w-8 text-ltre-dark-blue" />
      <span className="text-base font-semibold text-ltre-navy">{label}</span>
    </div>
  );
}

function LoginForm({ onSwitch }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-card-foreground">
          email
        </label>
        <Input id="email" type="email" placeholder="nome@ltre.br" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="senha" className="text-sm font-medium text-card-foreground">
          senha
        </label>
        <Input id="senha" type="password" placeholder="••••••••" />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="text-xs font-medium text-ltre-dark-blue hover:underline"
        >
          Esqueci a senha
        </button>
      </div>
      <Button type="submit" className="h-11 w-full">
        Entrar
      </Button>
      <div className="flex items-center justify-center gap-1 pt-1">
        <span className="text-xs text-muted-foreground">Não tem uma conta?</span>
        <button
          type="button"
          onClick={onSwitch}
          className="text-xs font-semibold text-ltre-dark-blue hover:underline"
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}

function RegisterForm({ onSwitch }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nome" className="text-sm font-medium text-card-foreground">
          nome
        </label>
        <Input id="nome" type="text" placeholder="Seu nome" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-card-foreground">
          email
        </label>
        <Input id="email" type="email" placeholder="nome@ltre.br" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="senha" className="text-sm font-medium text-card-foreground">
          senha
        </label>
        <Input id="senha" type="password" placeholder="••••••••" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirmar-senha" className="text-sm font-medium text-card-foreground">
          confirmar senha
        </label>
        <Input id="confirmar-senha" type="password" placeholder="••••••••" />
      </div>
      <Button type="submit" className="h-11 w-full">
        Entrar
      </Button>
      <div className="flex items-center justify-center gap-1 pt-1">
        <span className="text-xs text-muted-foreground">Já tem uma conta?</span>
        <button
          type="button"
          onClick={onSwitch}
          className="text-xs font-semibold text-ltre-dark-blue hover:underline"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default function AuthPage({ mode = "login" }) {
  const isLogin = mode === "login";

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Area */}
      <div className="hidden w-1/2 flex-col justify-center bg-card px-16 py-12 md:flex">
        <h1 className="text-[90px] font-bold leading-none text-ltre-navy">
          Portal LTRE
        </h1>
        <div className="mt-8 h-1.5 w-[400px] rounded-full bg-ltre-light-blue" />
        <div className="mt-6 flex w-full max-w-[592px] gap-4">
          <FeatureCard icon={FunctionSquare} label="Modelos matemáticos" />
          <FeatureCard icon={Folder} label="Armazenamento pessoal" />
        </div>
      </div>

      {/* Right Area */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-ltre-light-blue via-ltre-dark-blue to-ltre-navy p-8">
        <Card className="w-full max-w-[420px] shadow-[0_24px_48px_rgba(0,0,0,0.2)]">
          <div className="p-8">
            <h2 className="mb-8 text-center text-[28px] font-bold text-ltre-navy">
              {isLogin ? "Bem-vindo" : "Crie sua conta"}
            </h2>
            {isLogin ? (
              <LoginForm onSwitch={() => {}} />
            ) : (
              <RegisterForm onSwitch={() => {}} />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
