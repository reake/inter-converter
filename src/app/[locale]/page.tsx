import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {t("home.hero.title")}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t("home.hero.subtitle")}
        </p>
        <Button asChild size="lg">
          <Link href="/tools">{t("home.hero.cta")}</Link>
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("home.features.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{t(`home.features.items.${index}.title`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t(`home.features.items.${index}.description`)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
