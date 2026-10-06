import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function enter(page) {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Sim, tenho 18 anos ou mais" })
    .click();
  await expect(page.getByRole("heading", { name: /Tudo em um/ })).toBeVisible();
}

test("barreira de idade bloqueia catálogo e permite recusar acesso", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: /Tenho menos/ }).click();
  await expect(
    page.getByText("O acesso ao catálogo não é permitido"),
  ).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Voltar à confirmação" }).click();
  await page
    .getByRole("button", { name: "Sim, tenho 18 anos ou mais" })
    .click();
  await page.reload();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator(".product-grid .product-card")).toHaveCount(8);
});

test("busca por nome, marca, categoria, palavras-chave e acentos", async ({
  page,
}) => {
  await enter(page);
  const search = page.getByRole("searchbox");
  for (const [query, count] of [
    ["dichavador", 1],
    ["raw", 2],
    ["ACESSÓRIOS", 4],
    ["grinder", 1],
    ["carvao", 1],
  ]) {
    await search.fill(query);
    await expect(page.locator(".product-grid .product-card")).toHaveCount(
      count,
    );
  }
  await search.fill("produto inexistente");
  await expect(page.getByText("Nenhum produto por aqui.")).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.locator(".product-grid .product-card")).toHaveCount(8);
  await search.fill("raw");
  await page
    .getByRole("link", { name: "Mais procurados", exact: true })
    .click();
  await expect(search).toHaveValue("");
  await expect(page.locator("#destaques")).toBeVisible();
  await expect(page.locator(".product-grid .product-card")).toHaveCount(8);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Essências", exact: true }).click();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("link", { name: "Mais procurados", exact: true })
    .click();
  await expect(page.locator("#destaques")).toBeVisible();
  await expect(page.locator(".product-grid .product-card")).toHaveCount(8);
  await expect(
    page.getByRole("button", { name: "Abrir menu" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("categorias, ordenação e retorno de foco dos detalhes", async ({
  page,
}) => {
  await enter(page);
  await page.getByRole("button", { name: "Seda", exact: true }).click();
  await expect(page.locator(".product-grid .product-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Essências", exact: true }).click();
  await expect(page.getByText("Nenhum produto por aqui.")).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await page
    .getByRole("combobox", { name: "Ordenar produtos" })
    .selectOption("name");
  await expect(page.locator(".product-grid h3").first()).toHaveText(
    "Bandeja Essential",
  );
  const button = page
    .locator(".product-grid .product-card")
    .first()
    .getByRole("button", { name: "Ver detalhes", exact: true });
  await button.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Bandeja Essential",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(button).toBeFocused();
});

test("contato e documentos abrem informações sem montar pedido", async ({
  page,
}) => {
  await enter(page);
  await page.getByRole("button", { name: "Chamar no WhatsApp" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "O contato oficial da PODIUM ainda não foi cadastrado",
  );
  await page.getByRole("button", { name: "Entendi" }).click();
  await page.getByRole("button", { name: "Política de privacidade" }).click();
  await expect(page.getByRole("dialog")).toContainText("não envia sua busca");
  await page.getByRole("button", { name: "Entendi" }).click();
  await page.getByRole("button", { name: "Termos de uso" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "não processa pagamentos",
  );
});

for (const width of [375, 390, 430, 768, 1024, 1440]) {
  test(`layout ${width}px sem overflow, imagens carregadas e detalhes acessíveis`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await enter(page);
    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every((i) => i.complete && i.naturalWidth > 0),
          ),
      )
      .toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const columns = await page
      .locator(".product-grid")
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      );
    expect(columns).toBe(width < 768 ? 2 : width <= 1024 ? 3 : 4);
    await page
      .locator(".product-grid")
      .getByRole("button", { name: "Ver detalhes", exact: true })
      .first()
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const box = await page.getByRole("dialog").boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.width).toBeLessThanOrEqual(width);
    await page.getByRole("button", { name: "Voltar ao catálogo" }).click();
    expect(errors).toEqual([]);
  });
}

test("acessibilidade: confirmação, catálogo e detalhes", async ({ page }) => {
  await page.goto("/");
  const audit = async () => {
    // Contrast must be measured after the modal's entry animation completes.
    await page
      .locator("dialog[open]")
      .evaluateAll((elements) =>
        Promise.all(
          elements.flatMap((el) =>
            el.getAnimations().map((animation) => animation.finished),
          ),
        ),
      );
    return new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
  };
  expect(
    (await audit()).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        issue: n.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page
    .getByRole("button", { name: "Sim, tenho 18 anos ou mais" })
    .click();
  expect(
    (await audit()).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        issue: n.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page
    .locator(".product-grid")
    .getByRole("button", { name: "Ver detalhes", exact: true })
    .first()
    .click();
  expect(
    (await audit()).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        issue: n.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page.getByRole("button", { name: "Voltar ao catálogo" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    (await audit()).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        issue: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});
